import { SvelteMap } from "svelte/reactivity";
import { error, debug } from "@tauri-apps/plugin-log";
import { fetch } from "@tauri-apps/plugin-http";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * Manage requests with cache.
 */
export class Request {
	/**
	 * Singleton instance of the Request.
	 */
	private static _instance: Request = new Request();

	/**
	 * Get the instance of the Request.
	 */
	public static get instance(): Request {
		return Request._instance;
	}

	/**
	 * Map to save cache. This is an url <-> data map.
	 */
	private _cache: Map<string, RequestResponse> = new SvelteMap();

	private constructor() {}

	/**
	 * Makes a get request to the specified URL.
	 * @param url The URL to request to.
	 * @param cache Whether to get and set data to the cache or not.
	 * @returns The Response returned by the request.
	 */
	public async get(url: string, cache: boolean | undefined = true): Promise<Response> {
		if (cache) {
			const cachedData = this._cache.get(url);

			if (cachedData) {
				// If the data is less than 30 minutes old, return it
				if (Date.now() - cachedData.timestamp < 1000 * 60 * 30) return cachedData.response;
				// If it's more than 30 minutes old, remove it from the cache
				this._cache.delete(url);
			}
		}

		try {
			const response = await fetch(url);
			if (cache) this._cache.set(url, { timestamp: Date.now(), response });
			return response;
		} catch (err) {
			error(`There was an error making the request to ${url}!`);
			debug(`There was an error making the request to ${url}:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, `There was an error making the request to ${url}!`);
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
