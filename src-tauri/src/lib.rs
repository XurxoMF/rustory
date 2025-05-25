use chrono::Local;
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, TrayIconBuilder, TrayIconEvent},
    Manager,
};
use tauri_plugin_window_state::StateFlags;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default();

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

    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("No main window")
                .set_focus();
        }));
    }

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

    builder = builder.setup(|app| {
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
    });

    builder
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("Error while running tauri application");
}
