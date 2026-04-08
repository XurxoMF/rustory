use chrono::Local;
use tauri::Manager;
use tauri_plugin_window_state::StateFlags;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();

    // Init single instance plugin on desktop only
    // ! This one must be the first loaded plugin
    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("No main window")
                .set_focus();
        }));
    }

    // Init CLI plugin
    builder = builder.plugin(tauri_plugin_cli::init());

    // Init logger plugin
    builder = builder.plugin(
        tauri_plugin_log::Builder::new()
            .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll)
            .format(|out, message, record| {
                out.finish(format_args!(
                    "[{}][{}] {}",
                    Local::now().format("%Y-%m-%d %H:%M:%S%.6f"),
                    record.level(),
                    message
                ));
            })
            .build(),
    );

    // Init updater plugin
    builder = builder.plugin(tauri_plugin_updater::Builder::new().build());

    // Init window state plugin
    builder = builder.plugin(
        tauri_plugin_window_state::Builder::new()
            .with_state_flags(
                StateFlags::FULLSCREEN
                    | StateFlags::MAXIMIZED
                    | StateFlags::POSITION
                    | StateFlags::SIZE,
            )
            .build(),
    );

    // Init clipboard manager plugin
    builder = builder.plugin(tauri_plugin_clipboard_manager::init());

    // Init notification plugin
    builder = builder.plugin(tauri_plugin_notification::init());

    // Init OS plugin
    builder = builder.plugin(tauri_plugin_os::init());

    // Init shell plugin
    builder = builder.plugin(tauri_plugin_shell::init());

    // Init opener plugin
    builder = builder.plugin(tauri_plugin_opener::init());

    // Init process plugin
    builder = builder.plugin(tauri_plugin_process::init());

    // Init http plugin
    builder = builder.plugin(tauri_plugin_http::init());

    // Init upload plugin
    builder = builder.plugin(tauri_plugin_upload::init());

    // Init file system plugin
    builder = builder.plugin(tauri_plugin_fs::init());

    // Init persisted scope plugin
    // ! This one must be the last loaded plugin
    builder = builder.plugin(tauri_plugin_persisted_scope::init());

    builder
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("Error running Rustory");
}
