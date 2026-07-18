import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";
import { Logger } from "$lib/classes/utils/Logger.svelte";

/**
 * Structure of the queue.
 */
export type ConfirmQuestion = {
	title: string;
	description: string;
	mode?: "default" | "destructive" | undefined;
	resolve: (value: boolean) => void;
};

/**
 * Store for the confirm requests.
 */
export class Confirm {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	private static _instance: Confirm | undefined;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	public static get instance(): Confirm {
		if (Confirm._instance === undefined) throw new AppError(AppErrorCodes.NOT_INITIALIZED, "Confirm not initialized!");
		return Confirm._instance;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {
		this._queue = $state([]);
	}

	public static async init(): Promise<Confirm> {
		if (Confirm._instance !== undefined) return Confirm._instance;

		try {
			Logger.debug("Initializing confirm...");

			const confirm = new Confirm();
			Confirm._instance = confirm;
			return confirm;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error initializating the confirm: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error initializating the confirm!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * Queue to process.
	 */
	private _queue: ConfirmQuestion[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * Queue to process.
	 */
	public get queue(): ConfirmQuestion[] {
		return this._queue;
	}

	/**
	 * Queue to process.
	 */
	public set queue(queue: ConfirmQuestion[]) {
		this._queue = queue;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	public ask(question: Omit<ConfirmQuestion, "resolve">): Promise<boolean> {
		Logger.debug(`Asking a confirm...`);

		return new Promise((resolve) => {
			this.queue.push({
				title: question.title,
				description: question.description,
				mode: question.mode,
				resolve
			});
		});
	}

	public onaccept(question: ConfirmQuestion): void {
		Logger.debug(`Accepting a confirm...`);

		if (question) {
			question.resolve(true);
		}
		this.deleteQuestion();
	}

	public oncancel(question: ConfirmQuestion): void {
		Logger.debug(`Canceling a confirm...`);

		if (question) {
			question.resolve(false);
		}
		this.deleteQuestion();
	}

	private deleteQuestion(): void {
		Logger.debug(`Deleting a confirm...`);

		this.queue.shift();
	}
}
