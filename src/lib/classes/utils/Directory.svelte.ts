import { invoke } from "@tauri-apps/api/core";
import { dirname, join } from "@tauri-apps/api/path";
import { exists, mkdir, readDir, remove, rename } from "@tauri-apps/plugin-fs";

import { Logger } from "$lib/classes/utils/Logger.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

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
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error creating the directory: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error creating the directory!");
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
			Logger.debug(`Ensuring the directory ${this.path} exists...`);

			const directoryExists = await exists(this.path);

			if (!directoryExists) await mkdir(this.path, { recursive: true });
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error ensuring the directory exists: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error ensuring the directory exists!");
		}
	}

	/**
	 * Checks if the directory exists or not.
	 * @returns If the directory exists or not.
	 */
	public async exists(): Promise<boolean> {
		try {
			Logger.debug(`Checking if the directory ${this.path} exists...`);

			return await exists(this.path);
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error chcking if the directory exists: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error chcking if the directory exists!");
		}
	}

	/**
	 * Set's the permissions of the directory and it's contents on unix systems. Does nothing on other systems.
	 * @param mode The new permissions mode.
	 */
	public async setPermissions(mode: number): Promise<void> {
		try {
			Logger.debug(`Setting the directory ${this.path} permissions to ${mode}...`);

			await this.ensureExists();

			await invoke("set_permissions", { path: this._path, mode });
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error setting the directory permissions: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error setting the directory permissions!");
		}
	}

	/**
	 * Checks if the directory is empty or not.
	 * @returns If the directory is empty or not.
	 */
	public async isEmpty(): Promise<boolean> {
		try {
			Logger.debug(`Checking if the directory ${this.path} is empty...`);

			const directoryExists = await exists(this.path);

			if (!directoryExists) return true;

			const files = await readDir(this.path);

			return files.length === 0;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error ensuring the directory exists: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error ensuring the directory exists!");
		}
	}

	/**
	 * Gets the contents of the directory.
	 * @returns The files and directories of the directory.
	 */
	public async getContents(): Promise<{ files: File[]; directories: Directory[] }> {
		try {
			Logger.debug(`Getting the contents of the directory ${this.path}...`);

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
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error ensuring the directory exists: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error ensuring the directory exists!");
		}
	}

	/**
	 * Deletes the directory.
	 */
	public async delete(): Promise<void> {
		try {
			Logger.debug(`Deleting the directory ${this.path}...`);

			const directoryExists = await exists(this.path);

			if (!directoryExists) return;

			await remove(this.path, { recursive: true });
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error deleting the directory: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error deleting the directory!");
		}
	}

	/**
	 * Atomically renames this directory to a destination on the same filesystem.
	 * @param destination The destination directory.
	 */
	public async rename(destination: Directory): Promise<void> {
		try {
			Logger.debug(`Renaming the directory ${this.path} to ${destination.path}...`);

			const sourceExists = await this.exists();
			if (!sourceExists) throw new AppError(AppErrorCodes.FILE_SYSTEM_ERROR, `The directory ${this.path} does not exist!`);

			const destinationExists = await destination.exists();
			if (destinationExists) throw new AppError(AppErrorCodes.FILE_SYSTEM_ERROR, `The destination directory ${destination.path} already exists!`);

			await rename(this.path, destination.path);
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error renaming the directory ${this.path} to ${destination.path}: ${err}`);
			throw new AppError(AppErrorCodes.FILE_SYSTEM_ERROR, `There was an error renaming the directory ${this.path} to ${destination.path}!`);
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
			Logger.debug(
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
				Logger.error(`There was an error compressing the directory to a zip and couldn't be compressed!`);
				throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error compressing the directory to a zip!");
			}

			const zipPath = await join(destination.path, name);

			const zip = await Zip.create(zipPath);

			return zip;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error compressing the directory to a zip: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error compressing the directory to a zip!");
		}
	}
}
