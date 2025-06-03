pub mod modules;

use chrono::Local;
use specta_typescript::Typescript;
use tauri::Manager;
use tauri_plugin_window_state::StateFlags;
use tauri_specta::{collect_commands, collect_events, Builder};

use modules::utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // tauri_specta builder
    let mut ts_builder = Builder::<tauri::Wry>::new();

    // Resgister commands on tauri_specta
    ts_builder = ts_builder.commands(collect_commands![utils::greet,]);

    // Register event on tauri_specta
    ts_builder = ts_builder.events(collect_events![]);

    // On non-release, create the ts file to access commands
    #[cfg(debug_assertions)]
    {
        let export_result = ts_builder.export(Typescript::default(), "../src/lib/ipc.ts");
        if let Err(e) = export_result {
            println!("Could not export the TS bindings: {e}");
        }
    }

    // Tauri builder
    let mut builder = tauri::Builder::default();

    // Init single instance plugin on desktop only
    // KEEP THIS AS THE FIRST LOADED PLUGIN!!!
    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("No main window")
                .set_focus();
        }));
    }

    // Init deep-link plugin
    builder = builder.plugin(tauri_plugin_deep_link::init());

    // Init SQL plugin
    builder = builder.plugin(tauri_plugin_sql::Builder::new().build());

    // Init FS plugin
    builder = builder.plugin(tauri_plugin_fs::init());

    // Init process plugin
    builder = builder.plugin(tauri_plugin_process::init());

    // Init http plugin
    builder = builder.plugin(tauri_plugin_http::init());

    // Init dialog plugin
    builder = builder.plugin(tauri_plugin_dialog::init());

    // Init notification plugin
    builder = builder.plugin(tauri_plugin_notification::init());

    // Init and configure log plugin
    builder = builder.plugin(
        tauri_plugin_log::Builder::new()
            .rotation_strategy(tauri_plugin_log::RotationStrategy::KeepAll)
            .format(|out, message, record| {
                out.finish(format_args!(
                    "[{}][{}] {}",
                    Local::now().format("%Y-%m-%d %H:%M:%S"),
                    record.level(),
                    message
                ));
            })
            .build(),
    );

    // Init updater plugin
    builder = builder.plugin(tauri_plugin_updater::Builder::new().build());

    // Init opener plugin
    builder = builder.plugin(tauri_plugin_opener::init());

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

    // Add commands registered on tauri_specta to Tauri
    builder = builder.invoke_handler(ts_builder.invoke_handler());

    // Tauri setup
    builder = builder.setup(move |app| {
        // Add events registered on tauri_specta no Tauri
        ts_builder.mount_events(app);

        // Register deep-links on runtime
        #[cfg(any(windows, target_os = "linux"))]
        {
            use tauri_plugin_deep_link::DeepLinkExt;
            app.deep_link().register_all()?;
        }

        Ok(())
    });

    // Start the app
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
