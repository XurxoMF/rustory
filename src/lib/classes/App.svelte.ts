import { exit } from "@tauri-apps/plugin-process";
import { getCurrentWindow, Window } from "@tauri-apps/api/window";
import { trace, info, warn, error, debug } from "@tauri-apps/plugin-log";

import { sleep } from "$lib/utils";

import { RustoryError, RustoryErrorCodes } from "./RustoryError.svelte";
import { Loader } from "$lib/classes/utils/Loader.svelte";
import { Info } from "$lib/classes/app/Info.svelte";
import { Config } from "$lib/classes/app/Config.svelte";
import { Command } from "$lib/classes/app/Command.svelte";
import { Hotkeys } from "$lib/classes/app/Hotkeys.svelte";
import { Breadcrumbs } from "$lib/classes/app/Breadcrumbs.svelte";
import { Reloader } from "$lib/classes/app/Reloader.svelte";
import { Request } from "$lib/classes/app/Request.svelte";
import { Confirm } from "$lib/classes/app/Confirm.svelte";
import { Data } from "$lib/classes/app/Data.svelte";
import { Tray } from "$lib/classes/app/Tray.svelte";

/**
 * App manager. Used to initialize and store the different parts of the app.
 */
export class App {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	/**
	 * If the app is initialized.
	 */
	private static _isInitialized: boolean = false;

	/**
	 * App loader.
	 */
	private static _loader: Loader = new Loader();

	/**
	 * App window.
	 */
	private static _window: Window | null = null;

	/**
	 * App info.
	 */
	private static _info: Info | null = null;

	/**
	 * App config.
	 */
	private static _config: Config | null = null;

	/**
	 * App commands.
	 */
	private static _command: Command | null = null;

	/**
	 * App hotkeys.
	 */
	private static _hotkeys: Hotkeys | null = null;

	/**
	 * App breadcrumbs.
	 */
	private static _breadcrumbs: Breadcrumbs | null = null;

	/**
	 * App reloader.
	 */
	private static _reloader: Reloader | null = null;

	/**
	 * App request.
	 */
	private static _request: Request | null = null;

	/**
	 * App confirm.
	 */
	private static _confirm: Confirm | null = null;

	/**
	 * App tray.
	 */
	private static _tray: Tray | null = null;

	/**
	 * App data.
	 */
	private static _data: Data | null = null;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	/**
	 * If the app is initialized.
	 */
	public static get isInitialized(): boolean {
		return App._isInitialized;
	}

	/**
	 * App loader.
	 */
	public static get loader(): Loader {
		return App._loader;
	}

	/**
	 * App window.
	 */
	public static get window(): Window {
		if (App._window === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Window not initialized!");
		return App._window;
	}

	/**
	 * App info.
	 */
	public static get info(): Info {
		if (App._info === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Info not initialized!");
		return App._info;
	}

	/**
	 * App config.
	 */
	public static get config(): Config {
		if (App._config === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Config not initialized!");
		return App._config;
	}

	/**
	 * App commands.
	 */
	public static get command(): Command {
		if (App._command === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Command not initialized!");
		return App._command;
	}

	/**
	 * App hotkeys.
	 */
	public static get hotkeys(): Hotkeys {
		if (App._hotkeys === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Hotkeys not initialized!");
		return App._hotkeys;
	}

	/**
	 * App breadcrumbs.
	 */
	public static get breadcrumbs(): Breadcrumbs {
		if (App._breadcrumbs === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Breadcrumbs not initialized!");
		return App._breadcrumbs;
	}

	/**
	 * App reloader.
	 */
	public static get reloader(): Reloader {
		if (App._reloader === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Reloader not initialized!");
		return App._reloader;
	}

	/**
	 * App request.
	 */
	public static get request(): Request {
		if (App._request === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Request not initialized!");
		return App._request;
	}

	/**
	 * App confirm.
	 */
	public static get confirm(): Confirm {
		if (App._confirm === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Confirm not initialized!");
		return App._confirm;
	}

	/**
	 * App tray.
	 */
	public static get tray(): Tray {
		if (App._tray === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Tray not initialized!");
		return App._tray;
	}

	/**
	 * App data.
	 */
	public static get data(): Data {
		if (App._data === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Data not initialized!");
		return App._data;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {}

	/**
	 * Loads the app.
	 */
	public static async init(): Promise<void> {
		try {
			// If the App is already initialized, do nothing.
			if (App.isInitialized) return;

			App.extendConsoleLog();

			App._window = getCurrentWindow();

			App._info = await Info.init();
			App._config = await Config.init();
			App._command = await Command.init();
			App._hotkeys = await Hotkeys.init();
			App._breadcrumbs = await Breadcrumbs.init();
			App._reloader = await Reloader.init();
			App._request = await Request.init();
			App._confirm = await Confirm.init();
			App._tray = await Tray.init();

			// Show the window and wait a few ms for it to show up.
			await App.window.show();

			await sleep(500);

			App._data = await Data.init();

			// Start preloading the UI behind the loader and wait a few ms for it to load.
			App.loader.loadApp = true;

			await sleep(500);

			// Hide the loader.
			App.loader.showLoader = false;

			App._isInitialized = true;
		} catch (err) {
			error(`There was an error initializating the app:\n${err}`);
			exit(1);
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Extends the console log methods to log to both the log files and the web console.
	 */
	private static extendConsoleLog() {
		// Save the original console log methods
		const original = {
			log: console.log,
			warn: console.warn,
			error: console.error,
			trace: console.trace,
			debug: console.debug
		};

		// Override the console log methods to log to both the log files and the web console
		console.log = (...args) => {
			original.log(...args);
			info(`[WEB CONSOLE] ${args.join(" | ")}`);
		};
		console.warn = (...args) => {
			original.warn(...args);
			warn(`[WEB CONSOLE] ${args.join(" | ")}`);
		};
		console.error = (...args) => {
			original.error(...args);
			error(`[WEB CONSOLE] ${args.join(" | ")}`);
		};
		console.trace = (...args) => {
			original.trace(...args);
			trace(`[WEB CONSOLE] ${args.join(" | ")}`);
		};
		console.debug = (...args) => {
			original.debug(...args);
			debug(`[WEB CONSOLE] ${args.join(" | ")}`);
		};
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
