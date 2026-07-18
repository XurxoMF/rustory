import { Menu } from "@tauri-apps/api/menu";
import { TrayIcon, type TrayIconOptions } from "@tauri-apps/api/tray";
import { getCurrentWindow } from "@tauri-apps/api/window";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";
import { Info } from "$lib/classes/stores/Info.svelte";
import { Logger } from "$lib/classes/utils/Logger.svelte";

/**
 * App tray.
 */
export class Tray {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	private static _instance: Tray | undefined;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	public static get instance(): Tray {
		if (Tray._instance === undefined) throw new AppError(AppErrorCodes.NOT_INITIALIZED, "Tray not initialized!");
		return Tray._instance;
	}

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
		if (Tray._instance !== undefined) return Tray._instance;

		try {
			Logger.debug("Initializing tray...");

			const appWindow = getCurrentWindow();

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
				icon: Info.instance.icon ?? undefined,
				menu,
				showMenuOnLeftClick: true
			};

			const icon = await TrayIcon.new(options);

			const tray = new Tray({ menu, options, icon });
			Tray._instance = tray;
			return tray;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error initializating the tray: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error initializating the tray!");
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
