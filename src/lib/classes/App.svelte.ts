import { exit as exitApp } from "@tauri-apps/plugin-process";
import { getCurrentWindow, Window } from "@tauri-apps/api/window";

import { sleep, padSides } from "$lib/utils";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

import { Logger } from "$lib/classes/utils/Logger.svelte";
import { Loader } from "$lib/classes/utils/Loader.svelte";
import { Toaster } from "$lib/classes/utils/Toaster.svelte";

import { Info } from "$lib/classes/stores/Info.svelte";
import { Config } from "$lib/classes/stores/Config.svelte";
import { Command } from "$lib/classes/stores/Command.svelte";
import { Hotkeys } from "$lib/classes/stores/Hotkeys.svelte";
import { Breadcrumbs } from "$lib/classes/stores/Breadcrumbs.svelte";
import { Reloader } from "$lib/classes/stores/Reloader.svelte";
import { Request } from "$lib/classes/stores/Request.svelte";
import { Confirm } from "$lib/classes/stores/Confirm.svelte";
import { Data } from "$lib/classes/stores/Data.svelte";
import { Tray } from "$lib/classes/stores/Tray.svelte";

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
	 * App logger.
	 */
	private static _logger: Logger = new Logger();

	/**
	 * App loader.
	 */
	private static _loader: Loader = new Loader();

	/**
	 * App toaster.
	 */
	private static _toaster: Toaster = new Toaster();

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
	 * App logger.
	 */
	public static get logger(): Logger {
		return App._logger;
	}

	/**
	 * App loader.
	 */
	public static get loader(): Loader {
		return App._loader;
	}

	/**
	 * App toaster.
	 */
	public static get toaster(): Toaster {
		return App._toaster;
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

			App._logger.info("Initializing app...");

			App._logger.info("Forwarding console logs to the logger...");

			// Forward webview console logs to the logger.
			App.forwardConsole("log", App._logger.trace);
			App.forwardConsole("debug", App._logger.debug);
			App.forwardConsole("info", App._logger.info);
			App.forwardConsole("warn", App._logger.warn);
			App.forwardConsole("error", App._logger.error);

			App._logger.info("Saving the app window...");

			// Save the app window.
			App._window = getCurrentWindow();

			App._logger.info("Initializing basic modules...");

			// Initialize the required modules.
			App._info = await Info.init();
			App._config = await Config.init();
			App._tray = await Tray.init();

			App._logger.info("Showing window...");

			// Show the window and wait a few ms for it to show up.
			await App._window.show();

			App._logger.info("Initializing heavy and data modules...");

			// Initialize the heavy loading modules.
			App._command = await Command.init();
			App._hotkeys = await Hotkeys.init();
			App._breadcrumbs = await Breadcrumbs.init();
			App._reloader = await Reloader.init();
			App._request = await Request.init();
			App._confirm = await Confirm.init();
			App._data = await Data.init();

			// Log the welcome message.
			await App.logWelcome();

			// Start preloading the UI behind the loader.
			App._loader.loadApp = true;

			// Wait a few miliseconds for the UI to finish loading.
			await sleep(500);

			// Hide the loader.
			App._loader.showLoader = false;

			App._isInitialized = true;
		} catch (err) {
			App._logger.error(`There was an error initializating the app:\n${err}`);
			App.exit(1);
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

	public static async exit(code: number): Promise<void> {
		App._logger.info("Exiting the app...");

		await exitApp(code);
	}

	/**
	 * Extends the console log methods to log to both the log files and the web console.
	 */
	private static forwardConsole(
		fnName: "log" | "debug" | "info" | "warn" | "error",
		logger: (message: string, args?: { file: string; line: number }) => Promise<void>
	) {
		const original = console[fnName];
		console[fnName] = (message) => {
			original(message);
			logger(message);
		};
	}

	/**
	 * Logs a welcome message with some useful info.
	 */
	private static async logWelcome() {
		const WIDTH = 110;
		const SEPARATOR = `+${"-".repeat(WIDTH + 2)}+`;
		const VERSION: string = `Version: v${App.info.version}`;

		const osInfo: string = `OS Type: ${App.info.osType} · OS Version: ${App.info.osVersion} · OS Arch: ${App.info.osArch}`;
		const netSdksInfo: string = `.NET SDKs: ${App.info.netSdks.join(", ")}`;
		const netRuntimes: string = `.NET Runtimes: ${App.info.netRuntimes.join(", ")}`;

		App._logger.info("");
		App._logger.info("");
		App._logger.info(SEPARATOR);
		App._logger.info(`| ${padSides("    ____  __  _________________  ______  __", WIDTH)} |`);
		App._logger.info(
			`| ${padSides("   / __ \\/ / / / ___/_  __/ __ \\/ __ \\ \\/ /    Made with love by XurxoMF and all the contributors! ❤️", WIDTH)} |`
		);
		App._logger.info(`| ${padSides("  / /_/ / / / /\\__ \\ / / / / / / /_/ /\\  /     Copyright © 2025 - Today · XurxoMF", WIDTH)} |`);
		App._logger.info(`| ${padSides(` / _, _/ /_/ /___/ // / / /_/ / _, _/ / /      ${VERSION}`, WIDTH)} |`);
		App._logger.info(`| ${padSides("/_/ |_|\\____//____//_/  \\____/_/ |_| /_/", WIDTH)} |`);
		App._logger.info(SEPARATOR);
		App._logger.info(`| ${padSides(osInfo, WIDTH)} |`);
		App._logger.info(SEPARATOR);
		App._logger.info(`| ${padSides(netSdksInfo, WIDTH)} |`);
		App._logger.info(`| ${padSides(netRuntimes, WIDTH)} |`);
		App._logger.info(SEPARATOR);
		App._logger.info("");
		App._logger.info("");
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
