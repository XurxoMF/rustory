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
export class ConfirmStore {
	/**
	 * Singleton instance of the ConfirmStore.
	 */
	private static _instance: ConfirmStore = new ConfirmStore();

	/**
	 * Get the instance of the ConfirmStore.
	 */
	public static get instance(): ConfirmStore {
		return ConfirmStore._instance;
	}

	/**
	 * Queue to process.
	 */
	private _queue: ConfirmQuestion[] = $state([]);

	private constructor() {}

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

	public ask(question: Omit<ConfirmQuestion, "resolve">): Promise<boolean> {
		console.log(question);
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
