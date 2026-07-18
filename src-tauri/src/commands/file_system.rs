#[cfg(unix)]
use std::os::unix::fs::PermissionsExt;
use tokio::fs;

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

#[cfg(all(test, unix))]
mod tests {
    use super::*;
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
}
