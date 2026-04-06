import { debug, error } from "@tauri-apps/plugin-log";
import { exit } from "@tauri-apps/plugin-process";

import { VSInstance } from "$lib/classes/VSInstance.svelte";
import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * Data of the app.
 */
export class Data {
	/**
	 * Singleton instance of the Data.
	 */
	private static _instance: Data | null = null;

	/**
	 * Get the instance of the Data.
	 */
	public static get instance(): Data {
		if (Data._instance === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Data not initialized!");
		return Data._instance;
	}

	/**
	 * Vintage Story Instances.
	 */
	private _vsInstances: VSInstance[];

	private constructor(data: { vsInstances: VSInstance[] }) {
		this._vsInstances = $state(data.vsInstances);
	}

	/**
	 * Loads all the Rustory data on this instance.
	 */
	public static async init(): Promise<void> {
		try {
			// TODO: Load vsInstances from the config
			const vsInstances: VSInstance[] = [];

			Data._instance = new Data({
				vsInstances
			});
		} catch (err) {
			error("There was an error initializating the data! The app will be closed!");
			debug(`There was an error initializating the data:\n${JSON.stringify(err)}`);
			exit(1);
		}
	}

	/**
	 * Vintage Story Instances.
	 */
	public get vsInstances(): VSInstance[] {
		return this._vsInstances;
	}

	/**
	 * Vintage Story Instances.
	 */
	public set vsInstances(vsInstances: VSInstance[]) {
		this._vsInstances = vsInstances;
	}
}
