import { error, debug } from "@tauri-apps/plugin-log";
import { exit } from "@tauri-apps/plugin-process";
import {
	arch as getOsArch,
	family as getOsFamily,
	platform as getOsPlatform,
	type as getOsType,
	version as getOsVersion,
	type Arch as OsArch,
	type Family as OsFamily,
	type OsType as OsType,
	type Platform as OsPlatform
} from "@tauri-apps/plugin-os";
import { app, path } from "@tauri-apps/api";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * Info of the app.
 */
export class Info {
	/**
	 * Singleton instance of the Info.
	 */
	private static _instance: Info | null = null;

	/**
	 * Get the instance of the Info.
	 */
	public static get instance(): Info {
		if (Info._instance === null) throw new RustoryError(RustoryErrorCodes.NOT_INITIALIZED, "Info not initialized!");
		return Info._instance;
	}

	/**
	 * Name of the APP.
	 */
	private _name: string;

	/**
	 * Current version of the APP.
	 */
	private _version: string;

	/**
	 * Whether the APP is online.
	 */
	private _isOnline: boolean;

	/**
	 * System architecture.
	 */
	private _osArch: OsArch;

	/**
	 * System family.
	 */
	private _osFamily: OsFamily;

	/**
	 * System platform.
	 */
	private _osPlatform: OsPlatform;

	/**
	 * System type.
	 */
	private _osType: OsType;

	/**
	 * System version.
	 */
	private _osVersion: string;

	/**
	 * NET SDKs info.
	 */
	private _netSdks: string[];

	/**
	 * NET Runtimes info.
	 */
	private _netRuntimes: string[];

	/**
	 * Path for the APP data.
	 */
	private _dataPath: string;

	/**
	 * Path for the APP cache.
	 */
	private _cachePath: string;

	/**
	 * Path for the APP temporals.
	 */
	private _tempPath: string;

	/**
	 * Path for the APP logs.
	 */
	private _logsPath: string;

	private constructor(info: {
		name: string;
		version: string;
		osArch: OsArch;
		osFamily: OsFamily;
		osPlatform: OsPlatform;
		osType: OsType;
		osVersion: string;
		netSdks: string[];
		netRuntimes: string[];
		dataPath: string;
		cachePath: string;
		tempPath: string;
		logsPath: string;
	}) {
		this._name = info.name;
		this._version = info.version;
		this._isOnline = $state(navigator.onLine);
		this._osArch = info.osArch;
		this._osFamily = info.osFamily;
		this._osPlatform = info.osPlatform;
		this._osType = info.osType;
		this._osVersion = info.osVersion;
		this._netSdks = info.netSdks;
		this._netRuntimes = info.netRuntimes;
		this._dataPath = info.dataPath;
		this._cachePath = info.cachePath;
		this._tempPath = info.tempPath;
		this._logsPath = info.logsPath;

		// Listen to online/offline events
		window.addEventListener("online", () => (this._isOnline = true));
		window.addEventListener("offline", () => (this._isOnline = false));
	}

	/**
	 * Loads all the info about Rustory on this instance.
	 */
	public static async init(): Promise<void> {
		try {
			// Load basic info.
			const name = await app.getName();
			const version = await app.getVersion();

			// Load system info.
			const osArch = getOsArch();
			const osFamily = getOsFamily();
			const osPlatform = getOsPlatform();
			const osType = getOsType();
			const osVersion = getOsVersion();
			// TODO: Load all the NET SDKs and Runtimes
			const netSdks: string[] = [];
			const netRuntimes: string[] = [];

			// Load paths
			const dataPath = await path.appDataDir();
			const cachePath = await path.appCacheDir();
			const logsPath = await path.appLogDir();
			const tempPath = await path.join(cachePath, "tmp");

			// Set the info
			Info._instance = new Info({
				name,
				version,
				osArch,
				osFamily,
				osPlatform,
				osType,
				osVersion,
				netSdks,
				netRuntimes,
				dataPath,
				cachePath,
				tempPath,
				logsPath
			});
		} catch (err) {
			error("There was an error initializating the info! The app will be closed!");
			debug(`There was an error initializating the info:\n${JSON.stringify(err)}`);
			exit(1);
		}
	}

	/**
	 * Name of the APP.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Current version of the APP.
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * Whether the APP is online.
	 */
	public get isOnline(): boolean {
		return this._isOnline;
	}

	/**
	 * System architecture.
	 */
	public get osArch(): OsArch {
		return this._osArch;
	}

	/**
	 * System family.
	 */
	public get osFamily(): OsFamily {
		return this._osFamily;
	}

	/**
	 * System platform.
	 */
	public get osPlatform(): OsPlatform {
		return this._osPlatform;
	}

	/**
	 * System type.
	 */
	public get osType(): OsType {
		return this._osType;
	}

	/**
	 * System version.
	 */
	public get osVersion(): string {
		return this._osVersion;
	}

	/**
	 * NET SDKs info.
	 */
	public get netSdks(): string[] {
		return this._netSdks;
	}

	/**
	 * NET Runtimes info.
	 */
	public get netRuntimes(): string[] {
		return this._netRuntimes;
	}

	/**
	 * Path for the APP data.
	 */
	public get dataPath(): string {
		return this._dataPath;
	}

	/**
	 * Path for the APP cache.
	 */
	public get cachePath(): string {
		return this._cachePath;
	}

	/**
	 * Path for the APP temporals.
	 */
	public get tempPath(): string {
		return this._tempPath;
	}

	/**
	 * Path for the APP logs.
	 */
	public get logsPaths(): string {
		return this._logsPath;
	}
}
