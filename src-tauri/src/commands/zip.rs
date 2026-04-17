use std::fs::{self, File};
use std::io::{self, Read, Write};
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

        let file = File::create(&dest_path).map_err(|e| e.to_string())?;
        let mut zip = ZipWriter::new(file);
        let options = SimpleFileOptions::default()
            .compression_method(CompressionMethod::Bzip2)
            .compression_level(compression_level);

        for entry in WalkDir::new(source).into_iter().filter_map(|e| e.ok()) {
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
                let mut f = File::open(path).map_err(|e| e.to_string())?;
                let mut buf = Vec::new();
                f.read_to_end(&mut buf).map_err(|e| e.to_string())?;
                zip.write_all(&buf).map_err(|e| e.to_string())?;
            }
        }

        zip.finish().map_err(|e| e.to_string())?;

        Ok(true)
    })
    .await
    .map_err(|e| e.to_string())?
}

#[tauri::command]
pub async fn extract_zip(zip_path: String, dest_dir: String) -> Result<bool, String> {
    tauri::async_runtime::spawn_blocking(move || {
        let file = File::open(&zip_path).map_err(|e| e.to_string())?;
        let mut archive = ZipArchive::new(file).map_err(|e| e.to_string())?;
        let dest = Path::new(&dest_dir);

        for i in 0..archive.len() {
            let mut entry = archive.by_index(i).map_err(|e| e.to_string())?;
            let out_path = dest.join(entry.mangled_name());

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

        Ok(true)
    })
    .await
    .map_err(|e| e.to_string())?
}
