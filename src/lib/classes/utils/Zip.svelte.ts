import { invoke } from "@tauri-apps/api/core";
import { dirname } from "@tauri-apps/api/path";
import { exists, remove } from "@tauri-apps/plugin-fs";

import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

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
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error creating the zip!");
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
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error chcking if the zip exists!");
		}
	}

	/**
	 * Deletes the zip.
	 */
	public async delete(): Promise<void> {
		try {
			App.logger.debug(`Deleting the zip ${this.path}...`);

			const zipExists = await exists(this.path);

			if (!zipExists) return;

			await remove(this.path);
		} catch (err) {
			App.logger.error(`There was an error deleting the zip ${this.path}:\n${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error deleting the zip ${this.path}`);
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
				throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error extracting the zip!");
			}
		} catch (err) {
			App.logger.error(`There was an error extracting the zip:\n${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error extracting the zip!");
		}
	}

	/**
	 * Reads a file as text from inside the zip. Returns an empty string if the file does not exist.
	 * @param path The path to the insternal file to read.
	 * @returns The contents of that file.
	 */
	public async readTextFromFile(path: string): Promise<string> {
		try {
			App.logger.debug(`Reading the text from the file ${path}...`);

			const fileContents: string = await invoke("read_string_from_zip", { zipPath: this.path, filePath: path });

			return fileContents;
		} catch (err) {
			App.logger.error(`There was an error reading the text from the file inside the zip:\n${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error reading the text from the file inside the zip!");
		}
	}

	public async readJSONFromFile<T>(path: string): Promise<T> {
		try {
			App.logger.debug(`Reading the JSON from the file ${path}...`);

			const fileContents: string = await invoke("read_string_from_zip", { zipPath: this.path, filePath: path });

			if (!fileContents.startsWith("{")) return {} as T;

			return JSON.parse(fileContents) as T;
		} catch (err) {
			App.logger.error(`There was an error reading the JSON from the file inside the zip:\n${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error reading the JSON from the file inside the zip!");
		}
	}
}
