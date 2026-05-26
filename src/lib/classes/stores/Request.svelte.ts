import { fetch } from "@tauri-apps/plugin-http";
import { download } from "@tauri-apps/plugin-upload";

import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

/**
 * Manage requests with cache.
 */
export class Request {
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
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		this._cache = new Map<string, RequestResponse>();
	}

	/**
	 * Loads the app request.
	 * @returns An instance of the request of the app.
	 */
	public static async init(): Promise<Request> {
		try {
			App.logger.debug("Initializing request...");

			return new Request();
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error initializating the request: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error initializating the request!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * Map to save cache. This is an url <-> data map.
	 */
	private _cache: Map<string, RequestResponse>;

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
	 * Makes a get request to the specified URL.
	 * @param url The URL to request to.
	 * @param cache Whether to get and set data to the cache or not.
	 * @returns The Response returned by the request.
	 */
	public async get(url: string, cache: boolean | undefined = true): Promise<Response> {
		App.logger.debug(`Making GET request to ${url}...`);

		if (cache) {
			App.logger.debug("Cache enabled! Looking for matches...");

			const cachedData = this._cache.get(url);

			if (cachedData) {
				// If the data is less than 30 minutes old, return it
				if (Date.now() - cachedData.timestamp < 1000 * 60 * 30) {
					App.logger.debug("Valid cache found! Returning it...");

					return cachedData.response.clone();
				}

				// If it's more than 30 minutes old, remove it from the cache
				this._cache.delete(url);
			}

			App.logger.debug("No valid cache found!");
		}

		try {
			App.logger.debug("Making request...");

			if (!App.info.isOnline) throw new AppError(AppErrorCodes.OFFLINE, "Can't make a request while offline!");

			const response = await fetch(url);

			if (cache) {
				App.logger.debug("Cache enabled! Saving new response...");

				this._cache.set(url, { timestamp: Date.now(), response: response.clone() });
			}

			return response;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error making the request to ${url}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error making the request to ${url}!`);
		}
	}

	/**
	 *
	 * @param url The URL to download from.
	 * @param filePath The path to download the file to.
	 * @param progressHandler The progress handler.
	 * @param headers The headers to send with the request.
	 * @param body The body of the request.
	 */
	public async download(...params: Parameters<typeof download>): Promise<void> {
		try {
			App.logger.debug(`Downloading file from ${params[0]} to ${params[1]}...`);

			if (!App.info.isOnline) throw new AppError(AppErrorCodes.OFFLINE, "Can't download a file while offline!");

			await download(...params);

			App.logger.debug(`Finished downloading file from ${params[0]} to ${params[1]}!`);
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error downloading the file from ${params[0]} to ${params[1]}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error downloading the file from ${params[0]} to ${params[1]}!`);
		}
	}
}

/**
 * The data of a request.
 */
export type RequestResponse = {
	timestamp: number;
	response: Response;
};
