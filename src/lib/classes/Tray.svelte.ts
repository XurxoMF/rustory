import { debug, error } from "@tauri-apps/plugin-log";
import { exit } from "@tauri-apps/plugin-process";
import { defaultWindowIcon } from "@tauri-apps/api/app";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, type TrayIconOptions } from "@tauri-apps/api/tray";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * App tray.
 */
export class Tray {
	/**
	 * Singleton instance of the Tray.
	 */
	private static _instance: Tray | null = null;

	/**
	 * Get the instance of the Tray.
	 */
	public static get instance(): Tray {
		if (Tray._instance === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Tray not initialized!");
		return Tray._instance;
	}

	/**
	 * The menu of the tray.
	 */
	private _menu: Menu;

	/**
	 * The options of the tray.
	 */
	private _options: TrayIconOptions;

	/**
	 * The icon of the tray.
	 */
	private _icon: TrayIcon;

	private constructor(tray: { menu: Menu; options: TrayIconOptions; icon: TrayIcon }) {
		this._menu = tray.menu;
		this._options = $state(tray.options);
		this._icon = $state(tray.icon);
	}

	/**
	 * Creates the app tray.
	 */
	public static async init(): Promise<void> {
		try {
			const appWindow = getCurrentWindow();
			const appIcon = await defaultWindowIcon();

			const menu = await Menu.new({
				items: [
					{
						id: "open",
						text: "Open",
						action: () => appWindow.show()
					},
					{
						id: "quit",
						text: "Quit",
						action: () => appWindow.close()
					}
				]
			});

			const options: TrayIconOptions = {
				title: "Rustory",
				icon: appIcon ?? undefined,
				menu,
				showMenuOnLeftClick: true
			};

			const icon = await TrayIcon.new(options);

			Tray._instance = new Tray({ menu, options, icon });
		} catch (err) {
			error("There was an error initializating the tray! The app will be closed!");
			debug(`There was an error initializating the tray:\n${JSON.stringify(err)}`);
			exit(1);
		}
	}

	/**
	 * Clear events and remove unused things. Run it before restarting the app.
	 */
	public destroy(): void {
		try {
			this._icon.close();
		} catch (err) {
			error("There was an error destroying the tray!");
			debug(`There was an error destroying the tray:\n${JSON.stringify(err)}`);
			exit(1);
		}
	}
}
