mod commands;

use chrono::Local;

use tauri::Manager;

use tauri_plugin_log::log::{Level, LevelFilter};
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

    // Init logger plugin
    builder = builder.plugin(
        tauri_plugin_log::Builder::new()
            .level(read_log_level())
            .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll)
            .format(|out, message, record| {
                let level_icon = match record.level() {
                    Level::Error => "🔴 ERROR",
                    Level::Warn => "🟡 WARN",
                    Level::Info => "🟢 INFO",
                    Level::Debug => "🔵 DEBUG",
                    Level::Trace => "⚪ TRACE",
                };

                out.finish(format_args!(
                    "[{}][{}] {}",
                    Local::now().format("%Y-%m-%d %H:%M:%S%.6f"),
                    level_icon,
                    message
                ));
            })
            .build(),
    );

    // Init CLI plugin
    builder = builder.plugin(tauri_plugin_cli::init());

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

    // Init dialog plugin
    builder = builder.plugin(tauri_plugin_dialog::init());

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
        .invoke_handler(tauri::generate_handler![
            commands::file_system::set_permissions,
            commands::vs_versions::get_vs_version,
            commands::zip::compress_to_zip,
            commands::zip::extract_zip,
            commands::zip::read_string_from_zip
        ])
        .run(tauri::generate_context!())
        .expect("Error running Rustory");
}

fn read_log_level() -> LevelFilter {
    let default_level = LevelFilter::Info;

    let config_dir = match dirs::config_dir() {
        Some(dir) => dir,
        None => return default_level,
    };

    let path = config_dir.join("xyz.rustory.app").join("config.json");

    let contents = match std::fs::read_to_string(path) {
        Ok(c) => c,
        Err(_) => return default_level,
    };

    read_log_level_from_contents(&contents).unwrap_or(default_level)
}

fn read_log_level_from_contents(contents: &str) -> Option<LevelFilter> {
    let json: serde_json::Value = match serde_json::from_str(contents) {
        Ok(v) => v,
        Err(_) => return None,
    };

    match json.get("logLevel").and_then(|v| v.as_str()) {
        Some("trace") => Some(LevelFilter::Trace),
        Some("debug") => Some(LevelFilter::Debug),
        Some("info") => Some(LevelFilter::Info),
        Some("warn") => Some(LevelFilter::Warn),
        Some("error") => Some(LevelFilter::Error),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_every_supported_log_level() {
        let cases = [
            ("trace", LevelFilter::Trace),
            ("debug", LevelFilter::Debug),
            ("info", LevelFilter::Info),
            ("warn", LevelFilter::Warn),
            ("error", LevelFilter::Error),
        ];

        for (value, expected) in cases {
            let contents = format!(r#"{{"logLevel":"{value}"}}"#);

            assert_eq!(read_log_level_from_contents(&contents), Some(expected));
        }
    }

    #[test]
    fn rejects_missing_unknown_and_malformed_log_levels() {
        assert_eq!(read_log_level_from_contents(r#"{}"#), None);
        assert_eq!(
            read_log_level_from_contents(r#"{"logLevel":"verbose"}"#),
            None
        );
        assert_eq!(read_log_level_from_contents(r#"{"logLevel":5}"#), None);
        assert_eq!(read_log_level_from_contents("not-json"), None);
    }
}
