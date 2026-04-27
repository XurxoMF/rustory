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
