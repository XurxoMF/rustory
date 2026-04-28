import { App } from "$lib/classes/App.svelte";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

/**
 * Store for the reaload functions.
 *
 * Reload functions are callbacks that will be executed when the reload page button is clicked.
 */
export class Reloader {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {
		this._callbacks = [];
	}

	/**
	 * Loads the app reloader.
	 * @returns An instance of the reloader of the app.
	 */
	public static async init(): Promise<Reloader> {
		try {
			App.logger.debug("Initializing reloader...");

			return new Reloader();
		} catch (err) {
			App.logger.error(`There was an error initializating the reloader:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the reloader!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The callbacks that will be executed when the page is reloaded.
	 */
	private _callbacks: ReloaderTask[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Add a new task to the reloader.
	 * @param task - The task to add to the onReload list
	 */
	public addTask(task: ReloaderTask) {
		this._callbacks.push(task);
	}

	/**
	 * Remove a task from the reloader.
	 * @param id - The if of the task to remove from the onReload list
	 */
	public removeTask(id: string) {
		this._callbacks = this._callbacks.filter((task) => task.id !== id);
	}

	/**
	 * Executes the reload tasks.
	 */
	public executeTasks() {
		for (const task of this._callbacks) {
			task.action();
		}
	}
}

/**
 * A task to executer when the page is reloaded.
 */
export type ReloaderTask = { id: string; action: () => void | Promise<void> };
