use tokio::process::Command;

#[tauri::command]
pub async fn get_vs_version(executable_path: String) -> Result<String, String> {
    let output = Command::new(&executable_path)
        .arg("-v")
        .output()
        .await
        .map_err(|e| e.to_string())?;

    if !output.status.success() {
        return Err(format!("Proceso fallou: {}", output.status));
    }

    String::from_utf8(output.stdout)
        .map(|s| s.trim().to_string())
        .map_err(|e| e.to_string())
}
