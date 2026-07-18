use sha2::{Digest, Sha256};
#[cfg(unix)]
use std::os::unix::fs::PermissionsExt;
use tokio::fs::{self, File};
use tokio::io::{AsyncReadExt, BufReader};

#[tauri::command]
pub async fn get_file_sha256(path: String) -> Result<String, String> {
    calculate_file_sha256(&path).await
}

async fn calculate_file_sha256(path: &str) -> Result<String, String> {
    let file = File::open(path).await.map_err(|e| e.to_string())?;
    let mut reader = BufReader::new(file);
    let mut hasher = Sha256::new();
    let mut buffer = [0_u8; 64 * 1024];

    loop {
        let bytes_read = reader.read(&mut buffer).await.map_err(|e| e.to_string())?;

        if bytes_read == 0 {
            break;
        }

        hasher.update(&buffer[..bytes_read]);
    }

    Ok(format!("{:x}", hasher.finalize()))
}

#[tauri::command]
pub async fn set_permissions(path: String, mode: u32) -> Result<(), String> {
    #[cfg(unix)]
    {
        set_permissions_recursive(&path, mode).await?;
    }
    Ok(())
}

#[cfg(unix)]
async fn set_permissions_recursive(path: &str, mode: u32) -> Result<(), String> {
    let metadata = fs::metadata(path).await.map_err(|e| e.to_string())?;

    let mut perms = metadata.permissions();

    perms.set_mode(mode);

    fs::set_permissions(path, perms)
        .await
        .map_err(|e| e.to_string())?;

    if metadata.is_dir() {
        let mut entries = fs::read_dir(path).await.map_err(|e| e.to_string())?;

        while let Some(entry) = entries.next_entry().await.map_err(|e| e.to_string())? {
            let entry_path = entry.path();
            let path_str = entry_path.to_string_lossy().to_string();
            Box::pin(set_permissions_recursive(&path_str, mode)).await?;
        }
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    #[cfg(unix)]
    use std::os::unix::fs::PermissionsExt;
    use std::path::{Path, PathBuf};
    use std::sync::atomic::{AtomicU64, Ordering};

    static NEXT_TEST_DIRECTORY: AtomicU64 = AtomicU64::new(0);

    struct TestDirectory {
        path: PathBuf,
    }

    impl TestDirectory {
        fn create(name: &str) -> Self {
            let id = NEXT_TEST_DIRECTORY.fetch_add(1, Ordering::Relaxed);
            let path = std::env::temp_dir().join(format!(
                "rustory-{name}-permissions-{}-{id}",
                std::process::id()
            ));

            std::fs::create_dir_all(&path).expect("test directory should be created");

            Self { path }
        }

        fn path(&self) -> &Path {
            &self.path
        }
    }

    impl Drop for TestDirectory {
        fn drop(&mut self) {
            let _ = std::fs::remove_dir_all(&self.path);
        }
    }

    #[cfg(unix)]
    #[tokio::test]
    async fn applies_permissions_recursively() {
        let root = TestDirectory::create("recursive");
        let nested = root.path().join("nested");
        let file = nested.join("file.txt");

        std::fs::create_dir_all(&nested).expect("nested directory should be created");
        std::fs::write(&file, "contents").expect("test file should be written");

        let result = set_permissions_recursive(&root.path().to_string_lossy(), 0o700).await;

        assert_eq!(result, Ok(()));
        assert_eq!(
            std::fs::metadata(root.path())
                .expect("root metadata should exist")
                .permissions()
                .mode()
                & 0o777,
            0o700
        );
        assert_eq!(
            std::fs::metadata(&nested)
                .expect("nested metadata should exist")
                .permissions()
                .mode()
                & 0o777,
            0o700
        );
        assert_eq!(
            std::fs::metadata(&file)
                .expect("file metadata should exist")
                .permissions()
                .mode()
                & 0o777,
            0o700
        );
    }

    #[cfg(unix)]
    #[tokio::test]
    async fn returns_an_error_for_a_missing_path() {
        let id = NEXT_TEST_DIRECTORY.fetch_add(1, Ordering::Relaxed);
        let path = std::env::temp_dir().join(format!(
            "rustory-missing-permissions-{}-{id}",
            std::process::id()
        ));

        assert!(set_permissions_recursive(&path.to_string_lossy(), 0o700)
            .await
            .is_err());
    }

    #[tokio::test]
    async fn calculates_sha256_for_a_file() {
        let root = TestDirectory::create("sha256");
        let file = root.path().join("archive.zip");

        std::fs::write(&file, b"Rustory").expect("test file should be written");

        let checksum = calculate_file_sha256(&file.to_string_lossy())
            .await
            .expect("checksum should be calculated");

        assert_eq!(
            checksum,
            "3e92f0a5cdc44784c7304bda36545cef97eed54e0a3027160ac5b8f18d5f79da"
        );
    }

    #[tokio::test]
    async fn returns_an_error_when_calculating_sha256_for_a_missing_file() {
        let root = TestDirectory::create("missing-sha256");
        let file = root.path().join("missing.zip");

        assert!(calculate_file_sha256(&file.to_string_lossy())
            .await
            .is_err());
    }
}
