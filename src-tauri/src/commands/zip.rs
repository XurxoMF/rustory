use std::fs::{self, File};
use std::io::{self, Read};
use std::path::Path;
use walkdir::WalkDir;
use zip::{write::SimpleFileOptions, CompressionMethod, ZipArchive, ZipWriter};

#[tauri::command]
pub async fn compress_to_zip(
    source_dir: String,
    dest_dir: String,
    filename: String,
    compression_level: Option<i64>,
) -> Result<bool, String> {
    tauri::async_runtime::spawn_blocking(move || {
        let source = Path::new(&source_dir);
        let dest_path = Path::new(&dest_dir).join(&filename);

        fs::create_dir_all(&dest_dir).map_err(|e| e.to_string())?;

        compress_to_zip_sync(source, &dest_path, compression_level)?;

        Ok(true)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn extract_zip(zip_path: String, dest_dir: String) -> Result<bool, String> {
    tauri::async_runtime::spawn_blocking(move || {
        extract_zip_sync(Path::new(&zip_path), Path::new(&dest_dir))?;

        Ok(true)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn read_string_from_zip(zip_path: String, file_path: String) -> Result<String, String> {
    tokio::task::spawn_blocking(move || read_string_from_zip_sync(Path::new(&zip_path), &file_path))
        .await
        .map_err(|e| e.to_string())?
}

fn compress_to_zip_sync(
    source: &Path,
    destination: &Path,
    compression_level: Option<i64>,
) -> Result<(), String> {
    let file = File::create(destination).map_err(|e| e.to_string())?;
    let mut zip = ZipWriter::new(file);
    let options = SimpleFileOptions::default()
        .compression_method(CompressionMethod::Bzip2)
        .compression_level(compression_level);

    for entry in WalkDir::new(source)
        .into_iter()
        .filter_map(|entry| entry.ok())
    {
        let path = entry.path();
        let relative = path.strip_prefix(source).map_err(|e| e.to_string())?;
        let name = relative.to_string_lossy();

        if path.is_dir() {
            if !name.is_empty() {
                zip.add_directory(name.as_ref(), options)
                    .map_err(|e| e.to_string())?;
            }
        } else {
            zip.start_file(name.as_ref(), options)
                .map_err(|e| e.to_string())?;
            let mut file = File::open(path).map_err(|e| e.to_string())?;
            io::copy(&mut file, &mut zip).map_err(|e| e.to_string())?;
        }
    }

    zip.finish().map_err(|e| e.to_string())?;

    Ok(())
}

fn extract_zip_sync(zip_path: &Path, destination: &Path) -> Result<(), String> {
    let file = File::open(zip_path).map_err(|e| e.to_string())?;
    let mut archive = ZipArchive::new(file).map_err(|e| e.to_string())?;

    for index in 0..archive.len() {
        let mut entry = archive.by_index(index).map_err(|e| e.to_string())?;
        let out_path = destination.join(entry.mangled_name());

        if entry.is_dir() {
            fs::create_dir_all(&out_path).map_err(|e| e.to_string())?;
        } else {
            if let Some(parent) = out_path.parent() {
                fs::create_dir_all(parent).map_err(|e| e.to_string())?;
            }
            let mut out = File::create(&out_path).map_err(|e| e.to_string())?;
            io::copy(&mut entry, &mut out).map_err(|e| e.to_string())?;
        }
    }

    Ok(())
}

fn read_string_from_zip_sync(zip_path: &Path, file_path: &str) -> Result<String, String> {
    let file = File::open(zip_path).map_err(|e| e.to_string())?;
    let mut archive = ZipArchive::new(file).map_err(|e| e.to_string())?;
    let mut entry = match archive.by_name(file_path) {
        Ok(entry) => entry,
        Err(_) => return Ok(String::new()),
    };
    let mut contents = String::new();

    entry
        .read_to_string(&mut contents)
        .map_err(|e| e.to_string())?;

    Ok(contents)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Write;
    use std::path::PathBuf;
    use std::sync::atomic::{AtomicU64, Ordering};

    static NEXT_TEST_DIRECTORY: AtomicU64 = AtomicU64::new(0);

    struct TestDirectory {
        path: PathBuf,
    }

    impl TestDirectory {
        fn create(name: &str) -> Self {
            let id = NEXT_TEST_DIRECTORY.fetch_add(1, Ordering::Relaxed);
            let path =
                std::env::temp_dir().join(format!("rustory-{name}-{}-{id}", std::process::id()));

            fs::create_dir_all(&path).expect("test directory should be created");

            Self { path }
        }
    }

    impl Drop for TestDirectory {
        fn drop(&mut self) {
            let _ = fs::remove_dir_all(&self.path);
        }
    }

    #[test]
    fn compresses_reads_and_extracts_nested_files() {
        let workspace = TestDirectory::create("zip-roundtrip");
        let source = workspace.path.join("source");
        let nested = source.join("nested");
        let archive = workspace.path.join("archive.zip");
        let extracted = workspace.path.join("extracted");

        fs::create_dir_all(&nested).expect("nested directory should be created");
        fs::write(source.join("root.txt"), "root contents").expect("root file should be written");
        fs::write(nested.join("modinfo.json"), r#"{"name":"Example"}"#)
            .expect("nested file should be written");

        compress_to_zip_sync(&source, &archive, Some(6)).expect("archive should be created");

        assert_eq!(
            read_string_from_zip_sync(&archive, "nested/modinfo.json"),
            Ok(r#"{"name":"Example"}"#.to_string())
        );

        extract_zip_sync(&archive, &extracted).expect("archive should be extracted");

        assert_eq!(
            fs::read_to_string(extracted.join("root.txt"))
                .expect("extracted root file should be readable"),
            "root contents"
        );
        assert_eq!(
            fs::read_to_string(extracted.join("nested/modinfo.json"))
                .expect("extracted nested file should be readable"),
            r#"{"name":"Example"}"#
        );
    }

    #[test]
    fn returns_empty_text_for_a_missing_archive_entry() {
        let workspace = TestDirectory::create("zip-missing-entry");
        let source = workspace.path.join("source");
        let archive = workspace.path.join("archive.zip");

        fs::create_dir_all(&source).expect("source directory should be created");
        fs::write(source.join("present.txt"), "present").expect("source file should be written");
        compress_to_zip_sync(&source, &archive, None).expect("archive should be created");

        assert_eq!(
            read_string_from_zip_sync(&archive, "missing.txt"),
            Ok(String::new())
        );
    }

    #[test]
    fn keeps_parent_traversal_entries_inside_the_destination() {
        let workspace = TestDirectory::create("zip-traversal");
        let archive = workspace.path.join("archive.zip");
        let destination = workspace.path.join("destination");
        let escaped = workspace.path.join("escaped.txt");
        let file = File::create(&archive).expect("archive file should be created");
        let mut writer = ZipWriter::new(file);

        writer
            .start_file("../escaped.txt", SimpleFileOptions::default())
            .expect("archive entry should be created");
        writer
            .write_all(b"contained")
            .expect("archive entry should be written");
        writer.finish().expect("archive should be finalized");

        extract_zip_sync(&archive, &destination).expect("archive should be extracted");

        assert!(!escaped.exists());
        assert_eq!(
            fs::read_to_string(destination.join("escaped.txt"))
                .expect("contained traversal file should be readable"),
            "contained"
        );
    }

    #[test]
    fn rejects_invalid_zip_files() {
        let workspace = TestDirectory::create("zip-invalid");
        let archive = workspace.path.join("invalid.zip");

        fs::write(&archive, "not a zip").expect("invalid archive should be written");

        assert!(extract_zip_sync(&archive, &workspace.path.join("destination")).is_err());
        assert!(read_string_from_zip_sync(&archive, "file.txt").is_err());
    }
}
