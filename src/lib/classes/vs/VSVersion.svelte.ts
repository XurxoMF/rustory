import { invoke } from "@tauri-apps/api/core";

import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";

import type { RustoryApiVSVersion } from "$lib/classes/api/RustoryApiVSVersion.svelte";

/**
 * State of the Vintage Story Version.
 */
export enum VSVersionState {
	NOT_INSTALLED = "not_installed",
	INSTALLING = "installing",
	INSTALLED = "installed",
	DELETING = "deleting",
	ERROR = "error"
}

/**
 * Vinstage Story Version.
 */
export class VSVersion {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(vsVersion: { version: string; dir: Directory; state?: VSVersionState | undefined }) {
		this._version = vsVersion.version;
		this._dir = vsVersion.dir;
		this._state = $state(vsVersion.state ?? VSVersionState.INSTALLED);
	}

	/**
	 * Creates a new Vintage Story Version instance.
	 * @param path The path of the file.
	 * @returns The File instance.
	 */
	public static async create(vsInstance: { version: string; dir: Directory }): Promise<VSVersion> {
		try {
			return new VSVersion({
				version: vsInstance.version,
				dir: vsInstance.dir
			});
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error creating the Vintage Story Version: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error creating the Vintage Story Version!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The version of the Vintage Story Version.
	 */
	private _version: string;

	/**
	 * The directory of the Vintage Story Version.
	 */
	private _dir: Directory;

	/**
	 * The state of the Vintage Story Version.
	 */
	private _state: VSVersionState;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The directory of the Vintage Story Version.
	 */
	public get dir(): Directory {
		return this._dir;
	}
	/**
	 * The version of the Vintage Story Version.
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * The state of the Vintage Story Version.
	 */
	public get state(): VSVersionState {
		return this._state;
	}

	/**
	 * The state of the Vintage Story Version.
	 */
	public set state(state: VSVersionState) {
		this._state = state;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Loads a Vintage Story Version from a directory.
	 * @param dir The directory to load the Vintage Story Version from.
	 * @returns The Vintage Story Version.
	 */
	public static async fromDir(dir: Directory): Promise<VSVersion> {
		try {
			App.logger.debug(`Loading the Vintage Story Version from the directory ${dir.path}...`);

			const executable = await VSVersion.getExecutable(dir);

			App.logger.debug(`Found the executable ${executable.path}! Looking for the Vintage Story Version...`);

			await executable.setPermissions(0o755);

			const version: string = await invoke("get_vs_version", { executablePath: executable.path });

			App.logger.debug(`Found the Vintage Story Version ${version} on the directory ${dir.path}! Creating it...`);

			const vsVersion = await VSVersion.create({
				version,
				dir
			});

			App.logger.debug(`Loaded the Vintage Story Version ${version} from the directory ${dir.path}!`);

			return vsVersion;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error loading the Vintage Story Version from the directory ${dir.path}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error loading the Vintage Story Version from the directory ${dir.path}!`);
		}
	}

	/**
	 * Gets the executable path of the Vintage Story Version.
	 * @param dir The directory to look for the executable.
	 * @returns The file of the executable.
	 */
	public static async getExecutable(dir: Directory): Promise<File> {
		try {
			App.logger.debug(`Getting the executable path of the Vintage Story Version from the directory ${dir.path}...`);

			const contents = await dir.getContents();

			let executablePath: string | undefined;

			if (App.info.osType === "windows") {
				for (const file of contents.files) {
					if (file.path.endsWith("Vintagestory.exe")) {
						executablePath = file.path;
						break;
					}
				}
			}

			if (App.info.osType === "linux") {
				for (const file of contents.files) {
					if (file.path.endsWith("Vintagestory")) {
						executablePath = file.path;
						break;
					} else if (file.path.endsWith("Vintagestory.exe")) {
						executablePath = file.path;
						break;
					}
				}
			}

			if (App.info.osType === "macos") {
				for (const file of contents.files) {
					if (file.path.endsWith("Vintagestory")) {
						executablePath = file.path;
						break;
					} else if (file.path.endsWith("Vintagestory.exe")) {
						executablePath = file.path;
						break;
					}
				}
			}

			if (executablePath === undefined)
				throw new AppError(
					AppErrorCodes.GENERIC_ERROR,
					`There is no executable path of the Vintage Story Version on the path ${dir.path} for the user platform!`
				);

			App.logger.debug(`Found the executable ${executablePath} of the Vintage Story Version!`);

			const executable = await File.create(executablePath);

			return executable;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error getting executable path of the Vintage Story Version from the directory ${dir.path}: ${err}`);
			throw new AppError(
				AppErrorCodes.GENERIC_ERROR,
				`There was an error getting executable path of the Vintage Story Version from the directory ${dir.path}!`
			);
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Installs the Vintage Story Version.
	 * @param version The Rustory API Vintage Story Version to install.
	 */
	public async install(version: RustoryApiVSVersion): Promise<void> {
		try {
			App.logger.debug(`Installing Vintage Story Version ${this._version} from the Rustory API Vintage Story Version...`);

			this._state = VSVersionState.INSTALLING;

			const zip = await version.download(this._dir);

			App.logger.debug(`Downloaded the Vintage Story Version zip from the Rustory API Vintage Story Version on ${zip.path}!`);

			await this._dir.delete();
			await this._dir.ensureExists();

			App.logger.debug(`Extracting the Vintage Story Version zip ${zip.path} on ${this._dir.path}...`);

			await zip.extract(this._dir);

			App.logger.debug(
				`Extracted the Vintage Story Version zip ${zip.path} on ${this._dir.path}! Finished installing Vintage Story Version ${this._version}!`
			);

			this._state = VSVersionState.INSTALLED;

			App.toaster.toast.success(`Vintage Story Version ${this._version} installed successfully!`);
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error installing the Vintage Story Version ${this._version} from the Rustory API Vintage Story Version: ${err}`);
			throw new AppError(
				AppErrorCodes.GENERIC_ERROR,
				`There was an error installing the Vintage Story Version ${this._version} from the Rustory API Vintage Story Version!`
			);
		}
	}

	/**
	 * Deletes the Vintage Story Version.
	 */
	public async delete(): Promise<void> {
		try {
			App.logger.debug(`Deleting the Vintage Story Version ${this._version}...`);

			this._state = VSVersionState.DELETING;

			App.logger.debug(`Deleting the Vintage Story Version directory ${this._dir.path}...`);

			await this._dir.delete();

			App.logger.debug(`Deleted the Vintage Story Version directory ${this._dir.path}!`);

			App.logger.debug(`Deleted the Vintage Story Version ${this._version}!`);
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error deleting the Vintage Story Version: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error deleting the Vintage Story Version!");
		}
	}
}
