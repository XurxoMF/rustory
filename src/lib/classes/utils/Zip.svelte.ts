import { invoke } from "@tauri-apps/api/core";
import { dirname } from "@tauri-apps/api/path";
import { exists } from "@tauri-apps/plugin-fs";

import { App } from "$lib/classes/App.svelte";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

import { Directory } from "$lib/classes/utils/Directory.svelte";

/**
 * Represents a zip file that can be extracted, deleted, read files inside it...
 */
export class Zip {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	constructor(zip: { path: string; directory: Directory }) {
		this._path = zip.path;
		this._dir = zip.directory;
	}

	/**
	 * Creates a new Zip instance.
	 * @param path The path of the zip file.
	 * @returns The Zip instance.
	 */
	public static async create(path: string): Promise<Zip> {
		try {
			const directoryPath = await dirname(path);

			const directory = await Directory.create(directoryPath);

			return new Zip({ path, directory });
		} catch (err) {
			App.logger.error(`There was an error creating the zip:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error creating the zip!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The path of the zip file.
	 */
	private _path: string;

	/**
	 * The parent directory of the zip file.
	 */
	private _dir: Directory;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The path of the zip file.
	 */
	public get path(): string {
		return this._path;
	}

	/**
	 * The parent directory of the zip file.
	 */
	public get dir(): Directory {
		return this._dir;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Checks if the file exists or not.
	 * @returns If the file exists or not.
	 */
	public async exists(): Promise<boolean> {
		try {
			App.logger.debug(`Checking if the zip ${this.path} exists...`);

			return await exists(this.path);
		} catch (err) {
			App.logger.error(`There was an error chcking if the zip exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error chcking if the zip exists!");
		}
	}

	/**
	 * Extracts the zip to a directory.
	 * @param destination The Directory to extract the zip to.
	 */
	public async extract(destination: Directory): Promise<void> {
		try {
			App.logger.debug(`Extracting the zip ${this.path} to ${destination.path}...`);

			await destination.ensureExists();

			const result: boolean = await invoke("extract_zip", { zipPath: this.path, destDir: destination.path });

			if (!result) {
				App.logger.error(`There was an error extracting the zip and couldn't be extracted!`);
				throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error extracting the zip!");
			}
		} catch (err) {
			App.logger.error(`There was an error extracting the zip:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error extracting the zip!");
		}
	}
}
