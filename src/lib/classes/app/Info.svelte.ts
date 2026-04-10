import { error, debug } from "@tauri-apps/plugin-log";
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
import { defaultWindowIcon } from "@tauri-apps/api/app";
import type { Image } from "@tauri-apps/api/image";
import { Command } from "@tauri-apps/plugin-shell";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * Info of the app.
 */
export class Info {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(info: {
		name: string;
		version: string;
		icon: Image | undefined;
		osArch: OsArch;
		osFamily: OsFamily;
		osPlatform: OsPlatform;
		osType: OsType;
		osVersion: string;
		netSdks: string[];
		netRuntimes: string[];
		configPath: string;
		dataPath: string;
		cachePath: string;
		tempPath: string;
		logsPath: string;
	}) {
		this._name = info.name;
		this._version = info.version;
		this._icon = info.icon;
		this._isOnline = $state(navigator.onLine);
		this._osArch = info.osArch;
		this._osFamily = info.osFamily;
		this._osPlatform = info.osPlatform;
		this._osType = info.osType;
		this._osVersion = info.osVersion;
		this._netSdks = info.netSdks;
		this._netRuntimes = info.netRuntimes;
		this._configPath = info.configPath;
		this._dataPath = info.dataPath;
		this._cachePath = info.cachePath;
		this._tempPath = info.tempPath;
		this._logsPath = info.logsPath;

		// Listen to online/offline events
		window.addEventListener("online", () => (this._isOnline = true));
		window.addEventListener("offline", () => (this._isOnline = false));
	}

	/**
	 * Loads all the info of the app.
	 * @returns An instance of the info of the app.
	 */
	public static async init(): Promise<Info> {
		try {
			// Load basic info.
			const name = await app.getName();
			const version = await app.getVersion();
			const icon = await defaultWindowIcon();

			// Load system info.
			const osArch = getOsArch();
			const osFamily = getOsFamily();
			const osPlatform = getOsPlatform();
			const osType = getOsType();
			const osVersion = getOsVersion();

			// Load .NET SDKs info
			const netSdksCommand = await Command.create("check-dotnet", ["--list-sdks"]).execute();
			debug("NET SDKs:\n" + JSON.stringify(netSdksCommand));
			const netSdks: string[] = netSdksCommand.stdout
				.trim()
				.split("\n")
				.map((line) => line.match(/^[\D]*(\d+)/)?.[1])
				.filter((line) => line !== undefined);

			debug("NET SDKs:\n" + JSON.stringify(netSdks));

			// Load .NET Runtimes info
			const netRuntimesCommand = await Command.create("check-dotnet", ["--list-runtimes"]).execute();
			const netRuntimes: string[] = netRuntimesCommand.stdout
				.trim()
				.split("\n")
				.filter((line) => line.startsWith("Microsoft.NETCore.App"))
				.map((line) => line.match(/^[\D]*(\d+)/)?.[1])
				.filter((line) => line !== undefined);

			debug("NET Runtimes:\n" + JSON.stringify(netRuntimes));

			// Load paths
			const configPath = await path.appConfigDir();
			const dataPath = await path.appDataDir();
			const cachePath = await path.appCacheDir();
			const logsPath = await path.appLogDir();
			const tempPath = await path.join(cachePath, "tmp");

			return new Info({
				name,
				version,
				icon: icon ?? undefined,
				osArch,
				osFamily,
				osPlatform,
				osType,
				osVersion,
				netSdks,
				netRuntimes,
				configPath,
				dataPath,
				cachePath,
				tempPath,
				logsPath
			});
		} catch (err) {
			error("There was an error initializating the info!");
			debug(`There was an error initializating the info:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the info!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * Name of the app.
	 */
	private _name: string;

	/**
	 * Current version of the app.
	 */
	private _version: string;

	/**
	 * Icon of the app.
	 */
	private _icon: Image | undefined;

	/**
	 * Whether the app is online.
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
	 * Path for the app config.
	 */
	private _configPath: string;

	/**
	 * Path for the app data.
	 */
	private _dataPath: string;

	/**
	 * Path for the app cache.
	 */
	private _cachePath: string;

	/**
	 * Path for the app temporals.
	 */
	private _tempPath: string;

	/**
	 * Path for the app logs.
	 */
	private _logsPath: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * Name of the app.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * Current version of the app.
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * Icon of the app.
	 */
	public get icon(): Image | undefined {
		return this._icon;
	}

	/**
	 * Whether the app is online.
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
	 * Path for the app config.
	 */
	public get configPath(): string {
		return this._configPath;
	}

	/**
	 * Path for the app data.
	 */
	public get dataPath(): string {
		return this._dataPath;
	}

	/**
	 * Path for the app cache.
	 */
	public get cachePath(): string {
		return this._cachePath;
	}

	/**
	 * Path for the app temporals.
	 */
	public get tempPath(): string {
		return this._tempPath;
	}

	/**
	 * Path for the app logs.
	 */
	public get logsPaths(): string {
		return this._logsPath;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
