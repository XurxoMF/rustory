import { getCurrentWindow } from "@tauri-apps/api/window";
import { error, debug } from "@tauri-apps/plugin-log";
import { exit } from "@tauri-apps/plugin-process";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * MainWindow of the app.
 */
export class MainWindow {
	/**
	 * Singleton instance of the MainWindow.
	 */
	private static _instance: MainWindow | null = null;

	/**
	 * Get the instance of the MainWindow.
	 */
	public static get instance(): MainWindow {
		if (MainWindow._instance === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "MainWindow not initialized!");
		return MainWindow._instance;
	}

	/**
	 * Maximized state of the Main Window.
	 */
	private _maximized: boolean;

	/**
	 * Minimized state of the Main Window.
	 */
	private _minimized: boolean;

	/**
	 * Fullscreened state of the Main Window.
	 */
	private _fullscreened: boolean;

	private constructor(data: { maximized: boolean; minimized: boolean; fullscreened: boolean }) {
		this._maximized = $state(data.maximized);
		this._minimized = $state(data.minimized);
		this._fullscreened = $state(data.fullscreened);

		// TODO: Add listeners to window states
		/* window.api.window.on.maximize((_e, maximized) => (this._maximized = maximized));
		window.api.window.on.minimize((_e, minimized) => (this._minimized = minimized));d
		window.api.window.on.fullscreen((_e, fullscreened) => (this._fullscreened = fullscreened)); */
	}

	/**
	 * Loads all the info about Rustory on this instance.
	 */
	public static async init(): Promise<void> {
		try {
			const currentWindow = getCurrentWindow();

			// Load basic info.
			const maximized = await currentWindow.isMaximized();
			const minimized = await currentWindow.isMinimized();
			const fullscreened = await currentWindow.isFullscreen();

			// Set the info
			MainWindow._instance = new MainWindow({
				maximized,
				minimized,
				fullscreened
			});
		} catch (err) {
			error("There was an error initializating the main window! The app will be closed!");
			debug(`There was an error initializating the main window:\n${JSON.stringify(err)}`);
			exit(1);
		}
	}

	/**
	 * Maximized state of the Main Window.
	 */
	public get maximized(): boolean {
		return this._maximized;
	}

	/**
	 * Minimized state of the Main Window.
	 */
	public get minimized(): boolean {
		return this._minimized;
	}

	/**
	 * Fullscreened state of the Main Window.
	 */
	public get fullscreened(): boolean {
		return this._fullscreened;
	}
}
