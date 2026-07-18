import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";
import { Logger } from "$lib/classes/utils/Logger.svelte";

/**
 * Store for the reaload functions.
 *
 * Reload functions are callbacks that will be executed when the reload page button is clicked.
 */
export class Reloader {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	private static _instance: Reloader | undefined;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	public static get instance(): Reloader {
		if (Reloader._instance === undefined) throw new AppError(AppErrorCodes.NOT_INITIALIZED, "Reloader not initialized!");
		return Reloader._instance;
	}

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
		if (Reloader._instance !== undefined) return Reloader._instance;

		try {
			Logger.debug("Initializing reloader...");

			const reloader = new Reloader();
			Reloader._instance = reloader;
			return reloader;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error initializating the reloader: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error initializating the reloader!");
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
	 * @returns The id of the task
	 */
	public addTask(task: Omit<ReloaderTask, "id">): string {
		const id = crypto.randomUUID();

		this._callbacks.push({
			id,
			...task
		});

		return id;
	}

	/**
	 * Remove a task from the reloader.
	 * @param id - The if of the task to remove from the onReload list
	 */
	public removeTask(id: string): void {
		this._callbacks = this._callbacks.filter((task) => task.id !== id);
	}

	/**
	 * Executes the reload tasks.
	 */
	public reload(): void {
		for (const task of this._callbacks) {
			task.action();
		}
	}
}

/**
 * A task to executer when the page is reloaded.
 */
export type ReloaderTask = { id: string; action: () => void | Promise<void> };
