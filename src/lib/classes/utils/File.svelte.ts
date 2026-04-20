import { dirname } from "@tauri-apps/api/path";
import { create, exists, readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { error } from "@tauri-apps/plugin-log";

import { Directory } from "$lib/classes/utils/Directory.svelte";
import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * Represents a file that can be read, wirtten, deleted...
 */
export class File {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	constructor(file: { path: string; directory: Directory }) {
		this._path = file.path;
		this._dir = file.directory;
	}

	/**
	 * Creates a new File instance.
	 * @param path The path of the file.
	 * @returns The File instance.
	 */
	public static async create(path: string): Promise<File> {
		try {
			const directoryPath = await dirname(path);

			const directory = await Directory.create(directoryPath);

			return new File({ path, directory });
		} catch (err) {
			error(`There was an error creating the file:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error creating the file!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The path of the file.
	 */
	private _path: string;

	/**
	 * The parent directory of the file.
	 */
	private _dir: Directory;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The path of the file.
	 */
	public get path(): string {
		return this._path;
	}

	/**
	 * The parent directory of the file.
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
	 * Ensures the file exists. If it doesn't exists, it'll be created.
	 */
	public async ensureExists(): Promise<void> {
		try {
			await this.dir.ensureExists();

			const fileExists = await exists(this.path);

			if (!fileExists) await create(this.path);
		} catch (err) {
			error(`There was an error ensuring the directory exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error ensuring the directory exists!");
		}
	}

	/**
	 * Checks if the file exists or not.
	 * @returns If the file exists or not.
	 */
	public async exists(): Promise<boolean> {
		try {
			return await exists(this.path);
		} catch (err) {
			error(`There was an error chcking if the file exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error chcking if the file exists!");
		}
	}

	/**
	 * Reads a text from the file.
	 * @returns The readed text.
	 */
	public async readText(): Promise<string> {
		try {
			await this.ensureExists();

			const fileContents = await readTextFile(this.path);

			return fileContents;
		} catch (err) {
			error(`There was an error reading the file:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error reading the file!");
		}
	}

	/**
	 * Writtes a text to the file.
	 * @param text The text to write.
	 */
	public async writeText(text: string): Promise<void> {
		try {
			await this.ensureExists();

			await writeTextFile(this.path, text);
		} catch (err) {
			error(`There was an error writing the file:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error writing the file!");
		}
	}

	/**
	 * Reads a JSON from the file.
	 * @returns The readed JSON.
	 */
	public async readJSON<T>(): Promise<T> {
		try {
			await this.ensureExists();

			const fileContents = await readTextFile(this.path);

			if (!fileContents.startsWith("{")) return {} as T;

			return JSON.parse(fileContents) as T;
		} catch (err) {
			error(`There was an error reading the file:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error reading the file!");
		}
	}

	/**
	 * Writes a JSON to the file.
	 * @param data The JSON to write.
	 */
	public async writeJSON<T>(data: T): Promise<void> {
		try {
			await this.ensureExists();

			await writeTextFile(this.path, JSON.stringify(data, null, 2));
		} catch (err) {
			error(`There was an error writing the file:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error writing the file!");
		}
	}
}
