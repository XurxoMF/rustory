import { error } from "@tauri-apps/plugin-log";
import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, type TrayIconOptions } from "@tauri-apps/api/tray";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";
import { App } from "$lib/classes/App.svelte";

/**
 * App tray.
 */
export class Tray {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(tray: { menu: Menu; options: TrayIconOptions; icon: TrayIcon }) {
		this._menu = tray.menu;
		this._options = $state(tray.options);
		this._icon = $state(tray.icon);
	}

	/**
	 * Creates the app tray.
	 * @returns The app tray instance.
	 */
	public static async init(): Promise<Tray> {
		try {
			const menu = await Menu.new({
				items: [
					{
						id: "open",
						text: "Open",
						action: () => App.window.show()
					},
					{
						id: "quit",
						text: "Quit",
						action: () => App.window.close()
					}
				]
			});

			const options: TrayIconOptions = {
				title: "Rustory",
				icon: App.info.icon ?? undefined,
				menu,
				showMenuOnLeftClick: true
			};

			const icon = await TrayIcon.new(options);

			return new Tray({ menu, options, icon });
		} catch (err) {
			error(`There was an error initializating the tray:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the tray!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

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

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
