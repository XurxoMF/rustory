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

import { App } from "$lib/classes/App.svelte";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

import { Directory } from "$lib/classes/utils/Directory.svelte";

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
		capitalizedName: string;
		version: string;
		icon: Image | undefined;
		isOnline: boolean;
		osArch: OsArch;
		osFamily: OsFamily;
		osPlatform: OsPlatform;
		osType: OsType;
		osVersion: string;
		netSdks: string[];
		netRuntimes: string[];
		configDir: Directory;
		dataDir: Directory;
		cacheDir: Directory;
		tempDir: Directory;
		logsDir: Directory;
	}) {
		this._name = info.name;
		this._capitalizedName = info.capitalizedName;
		this._version = info.version;
		this._icon = info.icon;
		this._isOnline = $state(info.isOnline);
		this._osArch = info.osArch;
		this._osFamily = info.osFamily;
		this._osPlatform = info.osPlatform;
		this._osType = info.osType;
		this._osVersion = info.osVersion;
		this._netSdks = info.netSdks;
		this._netRuntimes = info.netRuntimes;
		this._configDir = info.configDir;
		this._dataDir = info.dataDir;
		this._cacheDir = info.cacheDir;
		this._tempDir = info.tempDir;
		this._logsDir = info.logsDir;

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
			App.logger.debug("Initializing info...");

			App.logger.debug("Loading app info...");

			// Load basic info.
			const name = await app.getName();
			const capitalizedName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
			const version = await app.getVersion();
			const icon = await defaultWindowIcon();
			const isOnline = navigator.onLine;

			App.logger.debug("Loading OS info...");

			// Load system info.
			const osArch = getOsArch();
			const osFamily = getOsFamily();
			const osPlatform = getOsPlatform();
			const osType = getOsType();
			const osVersion = getOsVersion();

			App.logger.debug("Loading .NET info...");

			// Load .NET SDKs info
			const netSdksCommand = await Command.create("check-dotnet", ["--list-sdks"]).execute();
			const netSdks: string[] = netSdksCommand.stdout
				.trim()
				.split("\n")
				.map((line) => line.match(/^[\D]*(\d+)/)?.[1])
				.filter((line) => line !== undefined);

			// Load .NET Runtimes info
			const netRuntimesCommand = await Command.create("check-dotnet", ["--list-runtimes"]).execute();
			const netRuntimes: string[] = netRuntimesCommand.stdout
				.trim()
				.split("\n")
				.filter((line) => line.startsWith("Microsoft.NETCore.App"))
				.map((line) => line.match(/^[\D]*(\d+)/)?.[1])
				.filter((line) => line !== undefined);

			App.logger.debug("Loading paths...");

			// Load config path
			const configDirectory = await path.appConfigDir();
			const configDir = await Directory.create(configDirectory);

			// Load data path
			const dataDirectory = await path.appDataDir();
			const dataDir = await Directory.create(dataDirectory);

			// Load cache path
			const cacheDirectory = await path.appCacheDir();
			const cacheDir = await Directory.create(cacheDirectory);

			// Load logs path
			const logsDirectory = await path.appLogDir();
			const logsDir = await Directory.create(logsDirectory);

			// Load temp path
			const tempDirectory = await path.join(cacheDirectory, "tmp");
			const tempDir = await Directory.create(tempDirectory);

			return new Info({
				name,
				capitalizedName,
				version,
				icon: icon ?? undefined,
				isOnline,
				osArch,
				osFamily,
				osPlatform,
				osType,
				osVersion,
				netSdks,
				netRuntimes,
				configDir,
				dataDir,
				cacheDir,
				tempDir,
				logsDir
			});
		} catch (err) {
			App.logger.error(`There was an error initializating the info:\n${err}`);
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
	 * Capitalized name of the app.
	 */
	private _capitalizedName: string;

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
	 *
	 * 'x86', 'x86_64', 'arm', 'aarch64', 'mips', 'mips64', 'powerpc', 'powerpc64', 'riscv64', 's390x' or 'sparc64'
	 */
	private _osArch: OsArch;

	/**
	 * System family.
	 *
	 * 'unix' or 'windows'
	 */
	private _osFamily: OsFamily;

	/**
	 * System platform.
	 *
	 * 'linux', 'macos', 'ios', 'freebsd', 'dragonfly', 'netbsd', 'openbsd', 'solaris', 'android' or 'windows'
	 */
	private _osPlatform: OsPlatform;

	/**
	 * System type.
	 *
	 * 'linux', 'macos', 'windows', 'ios' or 'android'
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
	 * Directory for the app config.
	 */
	private _configDir: Directory;

	/**
	 * Directory for the app data.
	 */
	private _dataDir: Directory;

	/**
	 * Directory for the app cache.
	 */
	private _cacheDir: Directory;

	/**
	 * Directory for the app temporals.
	 */
	private _tempDir: Directory;

	/**
	 * Directory for the app logs.
	 */
	private _logsDir: Directory;

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
	 * Capitalized name of the app.
	 */
	public get capitalizedName(): string {
		return this._capitalizedName;
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
	 *
	 * 'x86', 'x86_64', 'arm', 'aarch64', 'mips', 'mips64', 'powerpc', 'powerpc64', 'riscv64', 's390x', 'sparc64'
	 */
	public get osArch(): OsArch {
		return this._osArch;
	}

	/**
	 * System family.
	 *
	 * 'unix' or 'windows
	 */
	public get osFamily(): OsFamily {
		return this._osFamily;
	}

	/**
	 * System platform.
	 *
	 * 'linux', 'macos', 'ios', 'freebsd', 'dragonfly', 'netbsd', 'openbsd', 'solaris', 'android' or 'windows'
	 */
	public get osPlatform(): OsPlatform {
		return this._osPlatform;
	}

	/**
	 * System type.
	 *
	 * 'linux', 'macos', 'windows', 'ios' or 'android'
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
	 * Directory for the app config.
	 */
	public get configDir(): Directory {
		return this._configDir;
	}

	/**
	 * Directory for the app data.
	 */
	public get dataDir(): Directory {
		return this._dataDir;
	}

	/**
	 * Directory for the app cache.
	 */
	public get cacheDir(): Directory {
		return this._cacheDir;
	}

	/**
	 * Directory for the app temporals.
	 */
	public get tempDir(): Directory {
		return this._tempDir;
	}

	/**
	 * Directory for the app logs.
	 */
	public get logsDir(): Directory {
		return this._logsDir;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
