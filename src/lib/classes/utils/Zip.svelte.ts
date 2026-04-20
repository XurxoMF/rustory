import { invoke } from "@tauri-apps/api/core";
import { dirname } from "@tauri-apps/api/path";
import { error } from "@tauri-apps/plugin-log";
import { exists } from "@tauri-apps/plugin-fs";

import { Directory } from "$lib/classes/utils/Directory.svelte";
import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

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
			error(`There was an error creating the zip:\n${err}`);
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
			return await exists(this.path);
		} catch (err) {
			error(`There was an error chcking if the zip exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error chcking if the zip exists!");
		}
	}

	/**
	 * Extracts the zip to a directory.
	 * @param destination The Directory to extract the zip to.
	 */
	public async extract(destination: Directory): Promise<void> {
		try {
			await destination.ensureExists();

			const result: boolean = await invoke("extract_zip", { zipPath: this.path, destDir: destination.path });

			if (!result) {
				error(`There was an error extracting the zip and couldn't be extracted!`);
				throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error extracting the zip!");
			}
		} catch (err) {
			error(`There was an error extracting the zip:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error extracting the zip!");
		}
	}
}
