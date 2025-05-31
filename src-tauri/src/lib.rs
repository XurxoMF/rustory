pub mod modules;

use chrono::Local;
use specta_typescript::Typescript;
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    AppHandle, Manager, Runtime,
};
use tauri_plugin_window_state::StateFlags;
use tauri_specta::{collect_commands, Builder};

use modules::utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut ts_builder = Builder::<tauri::Wry>::new();

    ts_builder = ts_builder.commands(collect_commands![utils::greet]);

    #[cfg(debug_assertions)]
    ts_builder
        .export(Typescript::default(), "../src/lib/ipc.ts")
        .expect("Failed to export typescript bindings");

    let mut builder = tauri::Builder::default();

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("No main window")
                .set_focus();
        }));
    }

    builder = builder.plugin(tauri_plugin_deep_link::init());

    builder = builder.plugin(tauri_plugin_http::init());

    builder = builder.plugin(tauri_plugin_dialog::init());

    builder = builder.plugin(tauri_plugin_notification::init());

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

    builder = builder.plugin(tauri_plugin_updater::Builder::new().build());

    builder = builder.plugin(tauri_plugin_opener::init());

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

    builder = builder.invoke_handler(ts_builder.invoke_handler());

    builder = builder.setup(move |app| {
        ts_builder.mount_events(app);

        // Register deep-links on runtime
        #[cfg(any(windows, target_os = "linux"))]
        {
            use tauri_plugin_deep_link::DeepLinkExt;
            app.deep_link().register_all()?;
        }

        setup_tray(app.handle())?;

        Ok(())
    });

    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

/// Creates and manages the Tray icon and Menu
fn setup_tray<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<()> {
    let open_i = MenuItem::with_id(app, "open", "Open", true, None::<&str>)?;
    let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;

    let menu = Menu::with_items(app, &[&open_i, &quit_i])?;

    TrayIconBuilder::new()
        .icon(app.default_window_icon().unwrap().clone())
        .menu(&menu)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "quit" => app.exit(0),
            "open" => {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            }
            _ => println!("Menu item {:?} not handled", event.id),
        })
        .on_tray_icon_event(|tray, event| match event {
            TrayIconEvent::Click {
                button: MouseButton::Left,
                ..
            } => {
                let app = tray.app_handle();
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.show();
                    let _ = window.set_focus();
                }
            }
            _ => {}
        })
        .show_menu_on_left_click(false)
        .build(app)?;

    Ok(())
}
