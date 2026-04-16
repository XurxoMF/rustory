import { error } from "@tauri-apps/plugin-log";

import { App } from "$lib/classes/App.svelte";
import { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";
import { File } from "$lib/classes/utils/File.svelte";

/**
 * JSON of the data.
 */
export type DataJSON = {
	vsInstancesPaths: string[];
};

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

	private constructor(data: { file: File; vsInstances: VSInstance[] }) {
		this._file = data.file;
		this._vsInstances = $state(data.vsInstances);
	}

	/**
	 * Loads all the app data.
	 * @returns An instance of the data of the app.
	 */
	public static async init(): Promise<Data> {
		try {
			const path = await App.info.dataDir.join("data.json");
			const file = await File.create(path);
			// const dataJSON = await file.readJSON<DataJSON>();

			// TODO: Load vsInstances from the config
			const vsInstances: VSInstance[] = [];

			return new Data({
				file,
				vsInstances
			});
		} catch (err) {
			error(`There was an error initializating the data:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the data!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The data file.
	 */
	private _file: File;

	/**
	 * Vintage Story Instances.
	 */
	private _vsInstances: VSInstance[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The data file.
	 */
	public get file(): File {
		return this._file;
	}

	/**
	 * Vintage Story Instances.
	 */
	public get vsInstances(): VSInstance[] {
		return this._vsInstances;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Sets the new Vintage Story Instances.
	 * @param vsInstances The new Vintage Story Instances
	 */
	public async setVsInstances(vsInstances: VSInstance[]): Promise<void> {
		try {
			this._vsInstances = vsInstances;
			await this.save();
		} catch (err) {
			error(`There was an error saving the new Vintage Story Instances:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the new Vintage Story Instances!");
		}
	}

	/**
	 * Saves the data to the data file.
	 */
	public async save(): Promise<void> {
		try {
			const JSON = await this.exportToJSON();

			this._file.writeJSON(JSON);
		} catch (err) {
			error(`There was an error saving the data:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the data!");
		}
	}

	// TODO: Implement this.
	/**
	 * Imports the data from a JSON file.
	 * @param data The JSON with the data.
	 */
	// private async importFromJSON(data: DataJSON): Promise<void> {}

	/**
	 * Exports the data to a JSON.
	 * @returns A JSON with the data.
	 */
	private async exportToJSON(): Promise<DataJSON> {
		return {
			vsInstancesPaths: this._vsInstances.map((vsInstance) => vsInstance.dir.path)
		};
	}
}
