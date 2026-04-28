import { invoke } from "@tauri-apps/api/core";
import { dirname, join } from "@tauri-apps/api/path";
import { exists, mkdir, readDir, remove } from "@tauri-apps/plugin-fs";

import { App } from "$lib/classes/App.svelte";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

import { Zip } from "$lib/classes/utils/Zip.svelte";
import { File } from "$lib/classes/utils/File.svelte";

/**
 * Represents a directory that can be created, deleted...
 */
export class Directory {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	constructor(directory: { path: string; parent: Directory | null }) {
		this._path = directory.path;
		this._parent = directory.parent;
	}

	/**
	 * Creates a new Directory instance.
	 * @param path The path of the directory.
	 * @returns The Directory instance.
	 */
	public static async create(path: string): Promise<Directory> {
		try {
			let parentPath: string;

			try {
				parentPath = await dirname(path);
			} catch (err) {
				if (err === "path does not have a parent") return new Directory({ path, parent: null });

				throw err;
			}

			const parent = await Directory.create(parentPath);

			return new Directory({ path, parent });
		} catch (err) {
			App.logger.error(`There was an error creating the directory:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error creating the directory!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The path of the directory.
	 */
	private _path: string;

	/**
	 * The parent directory.
	 */
	private _parent: Directory | null;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The path of the directory.
	 */
	public get path(): string {
		return this._path;
	}

	/**
	 * The parent directory.
	 */
	public get parent(): Directory | null {
		return this._parent;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Ensures the directory exists. If it doesn't exists, it'll be created.
	 */
	public async ensureExists(): Promise<void> {
		try {
			App.logger.debug(`Ensuring the directory ${this.path} exists...`);

			const directoryExists = await exists(this.path);

			if (!directoryExists) await mkdir(this.path, { recursive: true });
		} catch (err) {
			App.logger.error(`There was an error ensuring the directory exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error ensuring the directory exists!");
		}
	}

	/**
	 * Checks if the directory exists or not.
	 * @returns If the directory exists or not.
	 */
	public async exists(): Promise<boolean> {
		try {
			App.logger.debug(`Checking if the directory ${this.path} exists...`);

			return await exists(this.path);
		} catch (err) {
			App.logger.error(`There was an error chcking if the directory exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error chcking if the directory exists!");
		}
	}

	/**
	 * Set's the permissions of the directory and it's contents on unix systems. Does nothing on other systems.
	 * @param mode The new permissions mode.
	 */
	public async setPermissions(mode: number): Promise<void> {
		try {
			App.logger.debug(`Setting the directory ${this.path} permissions to ${mode}...`);

			await this.ensureExists();

			await invoke("set_permissions", { path: this._path, mode });
		} catch (err) {
			App.logger.error(`There was an error setting the directory permissions:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error setting the directory permissions!");
		}
	}

	/**
	 * Checks if the directory is empty or not.
	 * @returns If the directory is empty or not.
	 */
	public async isEmpty(): Promise<boolean> {
		try {
			App.logger.debug(`Checking if the directory ${this.path} is empty...`);

			const directoryExists = await exists(this.path);

			if (!directoryExists) return true;

			const files = await readDir(this.path);

			return files.length === 0;
		} catch (err) {
			App.logger.error(`There was an error ensuring the directory exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error ensuring the directory exists!");
		}
	}

	/**
	 * Gets the contents of the directory.
	 * @returns The files and directories of the directory.
	 */
	public async getContents(): Promise<{ files: File[]; directories: Directory[] }> {
		try {
			App.logger.debug(`Getting the contents of the directory ${this.path}...`);

			const directoryExists = await exists(this.path);

			if (!directoryExists) return { files: [], directories: [] };

			const entries = await readDir(this.path);

			const files: File[] = [];
			const directories: Directory[] = [];

			for (const entry of entries) {
				const newPath = await this.join(entry.name);

				if (entry.isDirectory) {
					const newDir = await Directory.create(newPath);
					directories.push(newDir);
				} else {
					const newFile = await File.create(newPath);
					files.push(newFile);
				}
			}

			return { files, directories };
		} catch (err) {
			App.logger.error(`There was an error ensuring the directory exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error ensuring the directory exists!");
		}
	}

	/**
	 * Deletes the directory.
	 */
	public async delete(): Promise<void> {
		try {
			App.logger.debug(`Deleting the directory ${this.path}...`);

			const directoryExists = await exists(this.path);

			if (!directoryExists) return;

			await remove(this.path, { recursive: true });
		} catch (err) {
			App.logger.error(`There was an error deleting the directory:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error deleting the directory!");
		}
	}

	/**
	 * Joins the directory with the passed segments.
	 * @param paths The segments to join.
	 * @returns The joined path.
	 */
	public async join(...paths: string[]): Promise<string> {
		const path = await join(this.path, ...paths);

		return path;
	}

	/**
	 * Compress the directory to a zip.
	 * @param destination The Directory to compress the zip to.
	 * @param name The name of the zip file.
	 * @param compressionLevel The compression level of the zip file.
	 */
	public async compress(destination: Directory, name: string, compressionLevel: number): Promise<Zip> {
		try {
			App.logger.debug(
				`Compressing the directory ${this.path} to ${destination.path} with name ${name} and a compression level of ${compressionLevel}...`
			);

			await destination.ensureExists();

			const result: boolean = await invoke("compress_to_zip", {
				sourceDir: this.path,
				destDir: destination.path,
				filename: name,
				compressionLevel: compressionLevel
			});

			if (!result) {
				App.logger.error(`There was an error compressing the directory to a zip and couldn't be compressed!`);
				throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error compressing the directory to a zip!");
			}

			const zipPath = await join(destination.path, name);

			const zip = await Zip.create(zipPath);

			return zip;
		} catch (err) {
			App.logger.error(`There was an error compressing the directory to a zip:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error compressing the directory to a zip!");
		}
	}
}
