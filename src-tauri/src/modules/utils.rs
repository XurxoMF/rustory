#[tauri::command]
#[specta::specta]
pub fn greet(message: String) -> String {
    let res = format!("Hello from the backend! Message: {message}");
    res
}
