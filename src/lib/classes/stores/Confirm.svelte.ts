import { App } from "$lib/classes/App.svelte";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

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

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {
		this._queue = $state([]);
	}

	public static async init(): Promise<Confirm> {
		try {
			App.logger.debug("Initializing confirm...");

			return new Confirm();
		} catch (err) {
			App.logger.error(`There was an error initializating the confirm:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the confirm!");
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
		if (question) {
			question.resolve(true);
		}
		this.deleteQuestion();
	}

	public oncancel(question: ConfirmQuestion): void {
		if (question) {
			question.resolve(false);
		}
		this.deleteQuestion();
	}

	private deleteQuestion(): void {
		this.queue.shift();
	}
}
