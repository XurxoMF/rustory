import { Info } from "$lib/classes/stores/Info.svelte";
import { Request } from "$lib/classes/stores/Request.svelte";
import { Logger } from "$lib/classes/utils/Logger.svelte";

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
	public static async fetch(version: string, options?: { cache?: boolean | undefined } | undefined): Promise<RustoryApiVSVersion> {
		try {
			Logger.debug(`Fetching the Rustory API Vintage Story Version ${version}...`);

			const res: Response = await Request.instance.get(`https://api.rustory.xyz/versions/${version}`, options?.cache);

			Logger.trace(await res.text());

			const json: RustoryApiVSVersionJSON = await res.json();

			Logger.trace(JSON.stringify(json, null, 4));

			const rustoryApiVsVersion = new RustoryApiVSVersion({ ...json });

			return rustoryApiVsVersion;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error fetching the Rustory API Vintage Story Version ${version}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error fetching the Rustory API Vintage Story Version ${version}!`);
		}
	}

	/**
	 * Fetches all the Rustory API Vintage Story Versions.
	 * @returns The Rustory API Vintage Story Versions.
	 */
	public static async fetchAll(options?: { cache?: boolean | undefined } | undefined): Promise<RustoryApiVSVersion[]> {
		try {
			Logger.debug(`Fetching all the Rustory API Vintage Story Versions...`);

			const res: Response = await Request.instance.get(`https://api.rustory.xyz/versions`, options?.cache);

			const json: RustoryApiVSVersionJSON[] = await res.json();

			const rustoryApiVsVersions = json.map((v) => new RustoryApiVSVersion({ ...v }));

			return rustoryApiVsVersions;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error fetching all the Rustory API Vintage Story Versions: ${err}`);
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
			Logger.debug(`Downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version...`);

			const url = Info.instance.osType === "windows" ? this.windows : Info.instance.osType === "linux" ? this.linux : this.macos;
			const sha256 = Info.instance.osType === "windows" ? this.windowsSha : Info.instance.osType === "linux" ? this.linuxSha : this.macosSha;

			await dir.ensureExists();

			const downloadPath = await dir.join(`${this.version}-${sha256}-${Info.instance.osType}.zip.tmp`);

			Logger.debug(
				`Downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version on ${downloadPath} from ${url}...`
			);

			await Request.instance.download(url, downloadPath);

			Logger.debug(`Finished downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version!`);

			const zip = await Zip.create(downloadPath);

			return zip;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version: ${err}`);
			throw new AppError(
				AppErrorCodes.GENERIC_ERROR,
				`There was an error downloading the Vintage Story Version ${this.version} from the Rustory API Vintage Story Version!`
			);
		}
	}
}
