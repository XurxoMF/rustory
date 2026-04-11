import { dirname, join } from "@tauri-apps/api/path";
import { exists, mkdir } from "@tauri-apps/plugin-fs";
import { error } from "@tauri-apps/plugin-log";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

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
		const parentPath = await dirname(path);

		if (parentPath === path) {
			const directory = new Directory({ path, parent: null });

			return directory;
		}

		const parent = await Directory.create(parentPath);

		const directory = new Directory({ path, parent });

		return directory;
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
			const directoryExists = await exists(this.path);

			if (!directoryExists) await mkdir(this.path, { recursive: true });
		} catch (err) {
			error(`There was an error ensuring the directory exists:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error ensuring the directory exists!");
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
}
