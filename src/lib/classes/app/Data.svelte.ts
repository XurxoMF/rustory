import { debug, error } from "@tauri-apps/plugin-log";

import { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * Data of the app.
 */
export class Data {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(data: { vsInstances: VSInstance[] }) {
		this._vsInstances = $state(data.vsInstances);
	}

	/**
	 * Loads all the app data.
	 * @returns An instance of the data of the app.
	 */
	public static async init(): Promise<Data> {
		try {
			// TODO: Load vsInstances from the config
			const vsInstances: VSInstance[] = [];

			return new Data({
				vsInstances
			});
		} catch (err) {
			error("There was an error initializating the data!");
			debug(`There was an error initializating the data:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the data!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * Vintage Story Instances.
	 */
	private _vsInstances: VSInstance[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

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

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
