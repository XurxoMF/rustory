import { debug, error } from "@tauri-apps/plugin-log";

import { App } from "$lib/classes/App.svelte";
import type { RAPIVSVersion } from "$lib/classes/api/RAPIVSVersion.svelte";
import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";
import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";

import { toast } from "$lib/components/ui/sonner";

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
			error(`There was an error creating the Vintage Story Version:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error creating the Vintage Story Version!");
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
	 * Gets the executable path of the Vintage Story Version.
	 * @param dir The directory to look for the executable.
	 * @returns The path to the executable.
	 */
	public static async getExecutable(dir: Directory): Promise<File> {
		try {
			const contents = await dir.getContents();

			let executablePath: string | undefined;

			if (App.info.osType === "windows") {
				for (const file of contents.files) {
					if (file.path.endsWith("Vintagestory.exe")) {
						debug(`Found executable: ${file.path}`);
						executablePath = file.path;
						break;
					}
				}
			}

			if (App.info.osType === "linux") {
				for (const file of contents.files) {
					if (file.path.endsWith("Vintagestory")) {
						debug(`Found executable: ${file.path}`);
						executablePath = file.path;
						break;
					} else if (file.path.endsWith("Vintagestory.exe")) {
						debug(`Found executable: ${file.path}`);
						executablePath = file.path;
						break;
					}
				}
			}

			if (App.info.osType === "macos") {
				for (const file of contents.files) {
					if (file.path.endsWith("Vintagestory")) {
						debug(`Found executable: ${file.path}`);
						executablePath = file.path;
						break;
					} else if (file.path.endsWith("Vintagestory.exe")) {
						debug(`Found executable: ${file.path}`);
						executablePath = file.path;
						break;
					}
				}
			}

			if (!executablePath)
				throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There is no executable for this Vintage Story Version and the user platform!");

			const executable = await File.create(executablePath);

			return executable;
		} catch (err) {
			error(`There was an error getting the executable path:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error getting the executable path!");
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Installs this Vintage Story Version.
	 * @param version The Rustory API Version to install.
	 */
	public async install(version: RAPIVSVersion): Promise<void> {
		try {
			this._state = VSVersionState.INSTALLING;

			const zip = await version.download();

			await this._dir.delete();
			await this._dir.ensureExists();

			await zip.extract(this._dir);

			this._state = VSVersionState.INSTALLED;

			toast.success(`Vintage Story Version ${this._version} installed successfully!`);
		} catch (err) {
			error(`There was an error installing the Vintage Story Version:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error installing the Vintage Story Version!");
		}
	}

	/**
	 * Deleted the Vintage Story Version.
	 */
	public async delete(): Promise<void> {
		try {
			this._state = VSVersionState.DELETING;

			await this._dir.delete();
		} catch (err) {
			error(`There was an error deleting the Vintage Story Version:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error deleting the Vintage Story Version!");
		}
	}
}
