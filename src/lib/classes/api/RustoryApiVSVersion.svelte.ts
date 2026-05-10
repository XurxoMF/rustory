import { download } from "@tauri-apps/plugin-upload";

import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { Zip } from "$lib/classes/utils/Zip.svelte";
import type { Directory } from "$lib/classes/utils/Directory.svelte";

/**
 * JSON of the Rustory API Vintage Story Version.
 */
export type RustoryApiVSVersionJSON = {
	version: string;
	type: "pre" | "rc" | "stable";
	releaseDate: number;
	importedDate: number;
	windows: string;
	windowsSha: string;
	linux: string;
	linuxSha: string;
	macos: string;
	macosSha: string;
};

/**
 * Vintage Story Version fetched from the Rustory API.
 */
export class RustoryApiVSVersion {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(rustoryApiVsVersion: {
		version: string;
		type: "pre" | "rc" | "stable";
		releaseDate: number;
		importedDate: number;
		windows: string;
		windowsSha: string;
		linux: string;
		linuxSha: string;
		macos: string;
		macosSha: string;
	}) {
		this._version = rustoryApiVsVersion.version;
		this._type = rustoryApiVsVersion.type;
		this._releaseDate = rustoryApiVsVersion.releaseDate;
		this._importedDate = rustoryApiVsVersion.importedDate;
		this._windows = rustoryApiVsVersion.windows;
		this._windowsSha = rustoryApiVsVersion.windowsSha;
		this._linux = rustoryApiVsVersion.linux;
		this._linuxSha = rustoryApiVsVersion.linuxSha;
		this._macos = rustoryApiVsVersion.macos;
		this._macosSha = rustoryApiVsVersion.macosSha;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The version string, e.g. "1.15.4".
	 */
	private _version: string;

	/**
	 * The type of the version.
	 */
	private _type: "pre" | "rc" | "stable";

	/**
	 * The release date of the version.
	 */
	private _releaseDate: number;

	/**
	 * The import date of the version.
	 */
	private _importedDate: number;

	/**
	 * The download link for Windows.
	 */
	private _windows: string;

	/**
	 * The sha256 checksum for Windows.
	 */
	private _windowsSha: string;

	/**
	 * The download link for Linux.
	 */
	private _linux: string;

	/**
	 * The sha256 checksum for Linux.
	 */
	private _linuxSha: string;

	/**
	 * The download link for macOS.
	 */
	private _macos: string;

	/**
	 * The sha256 checksum for macOS.
	 */
	private _macosSha: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The version string, e.g. "1.15.4".
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * The type of the version.
	 */
	public get type(): "pre" | "rc" | "stable" {
		return this._type;
	}

	/**
	 * The release date of the version.
	 */
	public get releaseDate(): number {
		return this._releaseDate;
	}

	/**
	 * The import date of the version.
	 */
	public get importedDate(): number {
		return this._importedDate;
	}

	/**
	 * The download link for Windows.
	 */
	public get windows(): string {
		return this._windows;
	}

	/**
	 * The sha256 checksum for Windows.
	 */
	public get windowsSha(): string {
		return this._windowsSha;
	}

	/**
	 * The download link for Linux.
	 */
	public get linux(): string {
		return this._linux;
	}

	/**
	 * The sha256 checksum for Linux.
	 */
	public get linuxSha(): string {
		return this._linuxSha;
	}

	/**
	 * The download link for macOS.
	 */
	public get macos(): string {
		return this._macos;
	}

	/**
	 * The sha256 checksum for macOS.
	 */
	public get macosSha(): string {
		return this._macosSha;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Fetches a Rustory API Vintage Story Version.
	 * @param version The version to get.
	 * @returns The Rustory API Vintage Story Version.
	 */
	public static async fetch(version: string): Promise<RustoryApiVSVersion> {
		try {
			App.logger.debug(`Fetching the Rustory API Vintage Story Version ${version}...`);

			if (!App.info.isOnline) throw new AppError(AppErrorCodes.OFFLINE, "Can't fetch the Rustory API Vintage Story Version if the app is offline!");

			const res: Response = await App.request.get(`https://api.rustory.xyz/versions/${version}`);

			App.logger.trace(await res.text());

			const json: RustoryApiVSVersionJSON = await res.json();

			App.logger.trace(JSON.stringify(json, null, 4));

			const rustoryApiVsVersion = new RustoryApiVSVersion({ ...json });

			return rustoryApiVsVersion;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error fetching the Rustory API Vintage Story Version ${version}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error fetching the Rustory API Vintage Story Version ${version}!`);
		}
	}

	/**
	 * Fetches all the Rustory API Vintage Story Versions.
	 * @returns The Rustory API Vintage Story Versions.
	 */
	public static async fetchAll(): Promise<RustoryApiVSVersion[]> {
		try {
			App.logger.debug(`Fetching all the Rustory API Vintage Story Versions...`);

			if (!App.info.isOnline) throw new AppError(AppErrorCodes.OFFLINE, "Can't fetch all the Rustory API Vintage Story Versions while offline!");

			const res: Response = await App.request.get(`https://api.rustory.xyz/versions`);

			const json: RustoryApiVSVersionJSON[] = await res.json();

			const rustoryApiVsVersions = json.map((v) => new RustoryApiVSVersion({ ...v }));

			return rustoryApiVsVersions;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error fetching all the Rustory API Vintage Story Versions: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error fetching all the Rustory API Vintage Story Versions!");
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Downloads the Vintage Story Version from this Rustory API Vintage Story Version to the specified directory.
	 * @returns The zip of the Vintage Story Version.
	 */
	public async download(dir: Directory): Promise<Zip> {
		try {
			App.logger.debug(`Downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version...`);

			if (!App.info.isOnline)
				throw new AppError(
					AppErrorCodes.OFFLINE,
					`Can't download the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version if the app is offline!`
				);

			const url = App.info.osType === "windows" ? this.windows : App.info.osType === "linux" ? this.linux : this.macos;
			const sha256 = App.info.osType === "windows" ? this.windowsSha : App.info.osType === "linux" ? this.linuxSha : this.macosSha;

			await dir.ensureExists();

			const downloadPath = await dir.join(`${this.version}-${sha256}-${App.info.osType}.zip.tmp`);

			App.logger.debug(
				`Downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version on ${downloadPath} from ${url}...`
			);

			await download(url, downloadPath);

			App.logger.debug(`Finished downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version!`);

			const zip = await Zip.create(downloadPath);

			return zip;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version: ${err}`);
			throw new AppError(
				AppErrorCodes.GENERIC_ERROR,
				`There was an error downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version!`
			);
		}
	}
}
