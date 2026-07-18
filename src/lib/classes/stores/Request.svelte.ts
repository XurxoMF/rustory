import { fetch } from "@tauri-apps/plugin-http";
import { download } from "@tauri-apps/plugin-upload";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";
import { Info } from "$lib/classes/stores/Info.svelte";
import { Logger } from "$lib/classes/utils/Logger.svelte";

/**
 * Manage requests with cache.
 */
export class Request {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	private static _instance: Request | undefined;
	private static _initialization: Promise<Request> | undefined;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	/**
	 * The initialized request service.
	 */
	public static get instance(): Request {
		if (Request._instance === undefined) throw new AppError(AppErrorCodes.NOT_INITIALIZED, "Request not initialized!");
		return Request._instance;
	}

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
		if (Request._instance !== undefined) return Request._instance;
		if (Request._initialization !== undefined) return await Request._initialization;

		Request._initialization = Request.load();

		try {
			const request = await Request._initialization;
			Request._instance = request;

			return request;
		} finally {
			Request._initialization = undefined;
		}
	}

	private static async load(): Promise<Request> {
		try {
			Logger.debug("Initializing request...");

			return new Request();
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error initializating the request: ${err}`);
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
	 * Clears all cached responses.
	 */
	public clearCache(): void {
		this._cache.clear();
	}

	/**
	 * Makes a get request to the specified URL.
	 * @param url The URL to request to.
	 * @param cache Whether to get and set data to the cache or not.
	 * @returns The Response returned by the request.
	 */
	public async get(url: string, cache: boolean | undefined = true): Promise<Response> {
		Logger.debug(`Making GET request to ${url}...`);

		if (cache) {
			Logger.debug("Cache enabled! Looking for matches...");

			const cachedData = this._cache.get(url);

			if (cachedData) {
				// If the data is less than 30 minutes old, return it
				if (Date.now() - cachedData.timestamp < 1000 * 60 * 30) {
					Logger.debug("Valid cache found! Returning it...");

					return cachedData.response.clone();
				}

				// If it's more than 30 minutes old, remove it from the cache
				this._cache.delete(url);
			}

			Logger.debug("No valid cache found!");
		}

		try {
			Logger.debug("Making request...");

			if (!Info.instance.isOnline) throw new AppError(AppErrorCodes.OFFLINE, "Can't make a request while offline!");

			const response = await fetch(url);

			if (cache) {
				Logger.debug("Cache enabled! Saving new response...");

				this._cache.set(url, { timestamp: Date.now(), response: response.clone() });
			}

			return response;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error making the request to ${url}: ${err}`);
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
			Logger.debug(`Downloading file from ${params[0]} to ${params[1]}...`);

			if (!Info.instance.isOnline) throw new AppError(AppErrorCodes.OFFLINE, "Can't download a file while offline!");

			await download(...params);

			Logger.debug(`Finished downloading file from ${params[0]} to ${params[1]}!`);
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error downloading the file from ${params[0]} to ${params[1]}: ${err}`);
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
