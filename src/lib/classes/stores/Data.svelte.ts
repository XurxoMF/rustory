import { SvelteMap } from "svelte/reactivity";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { Info } from "$lib/classes/stores/Info.svelte";
import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";
import { Logger } from "$lib/classes/utils/Logger.svelte";

import { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
import { VSVersion, VSVersionState } from "$lib/classes/vs/VSVersion.svelte";

import type { RustoryApiVSVersion } from "$lib/classes/api/RustoryApiVSVersion.svelte";

/**
 * JSON of the data.
 */
export type DataJSON = {
	schemaVersion: typeof Data.SCHEMA_VERSION;
	vsVersionsPaths: string[];
	vsInstancesPaths: string[];
};

/**
 * Data of the app.
 */
export class Data {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	/**
	 * Current data.json schema version.
	 */
	private static _SCHEMA_VERSION = 1 as const;
	private static _instance: Data | undefined;
	private static _initialization: Promise<Data> | undefined;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	/**
	 * Current data.json schema version.
	 */
	public static get SCHEMA_VERSION(): typeof Data._SCHEMA_VERSION {
		return Data._SCHEMA_VERSION;
	}

	/**
	 * The initialized app data.
	 */
	public static get instance(): Data {
		if (Data._instance === undefined) throw new AppError(AppErrorCodes.NOT_INITIALIZED, "Data not initialized!");
		return Data._instance;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(data: { file: File; vsVersions: VSVersion[]; vsInstances: VSInstance[] }) {
		this._file = data.file;
		this._vsVersions = $state(data.vsVersions);
		this._vsInstances = $state(data.vsInstances);
		this._vsVersionRegistrations = new SvelteMap();
		this._vsVersionInstallations = new SvelteMap();
	}

	/**
	 * Loads all the app data.
	 * @returns An instance of the data of the app.
	 */
	public static async init(): Promise<Data> {
		if (Data._instance !== undefined) return Data._instance;
		if (Data._initialization !== undefined) return await Data._initialization;

		Data._initialization = Data.load();

		try {
			const data = await Data._initialization;
			Data._instance = data;

			return data;
		} finally {
			Data._initialization = undefined;
		}
	}

	private static async load(): Promise<Data> {
		try {
			Logger.debug("Initializing data...");

			const path = await Info.instance.dataDir.join("data.json");
			const file = await File.create(path);
			const rawDataJSON = await file.readJSON<unknown>();
			const dataJSON = Data.parseJSON(rawDataJSON);

			Logger.debug("Loading Vintage Story Versions...");

			const vsVersions: VSVersion[] = [];

			if (dataJSON.vsVersionsPaths.length > 0) {
				await Promise.all(
					dataJSON.vsVersionsPaths.map(async (vsVersionPath) => {
						const dir = await Directory.create(vsVersionPath);
						const vsVersion = await Data.loadVsVersion(dir);

						vsVersions.push(vsVersion);
					})
				);
			}

			Logger.debug(`Loadded ${vsVersions.length} Vintage Story Versions!`);

			Logger.debug("Loading Vintage Story Instances...");

			const vsInstances: VSInstance[] = [];

			if (dataJSON.vsInstancesPaths.length > 0) {
				await Promise.all(
					dataJSON.vsInstancesPaths.map(async (vsInstancePath) => {
						const dir = await Directory.create(vsInstancePath);

						const vsInstance = await VSInstance.fromDir(dir);

						vsInstances.push(vsInstance);
					})
				);
			}

			Logger.debug(`Loadded ${vsInstances.length} Vintage Story Instances!`);

			Logger.debug("Loading Vinatge Story Instances Mods...");

			await Promise.all(
				vsInstances.map(async (vsInstance) => {
					const vsMods = await vsInstance.loadMods();

					vsInstance.mods = vsMods;
				})
			);

			Logger.debug("Loaded all the mods of the Vintage Story Instances!");

			const data = new Data({
				file,
				vsVersions,
				vsInstances
			});

			await Promise.all(
				data.vsInstances.map(async (vsInstance) => {
					await vsInstance.save();
				})
			);

			await data.save();

			return data;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error initializating the data: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error initializating the data!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The data file.
	 */
	private _file: File;

	/**
	 * Vintage Story Versions.
	 */
	private _vsVersions: VSVersion[];

	/**
	 * Vintage Story Instances.
	 */
	private _vsInstances: VSInstance[];

	/**
	 * In-progress Vintage Story Version registrations keyed by version.
	 */
	private _vsVersionRegistrations: SvelteMap<string, Promise<VSVersion>>;

	/**
	 * In-progress Vintage Story Version installations keyed by version.
	 */
	private _vsVersionInstallations: SvelteMap<string, Promise<void>>;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The data file.
	 */
	public get file(): File {
		return this._file;
	}

	/**
	 * Vintage Story Versions.
	 */
	public get vsVersions(): VSVersion[] {
		return this._vsVersions;
	}

	/**
	 * Vintage Story Instances.
	 */
	public get vsInstances(): VSInstance[] {
		return this._vsInstances;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Loads a registered Vintage Story Version and preserves it as not installed when validation fails.
	 * @param dir The registered version directory.
	 * @returns The validated or not-installed Vintage Story Version.
	 */
	public static async loadVsVersion(dir: Directory): Promise<VSVersion> {
		try {
			return await VSVersion.fromDir(dir);
		} catch (err) {
			const version = await dir.getName();
			const vsVersion = await VSVersion.create({ version, dir, state: VSVersionState.NOT_INSTALLED });
			await Data.logBackgroundError(`Vintage Story Version ${version} is registered but not installed correctly: ${err}`);

			return vsVersion;
		}
	}

	/**
	 * Validates and migrates data.json data to the current schema.
	 * @param dataJSON The raw data.json data.
	 * @returns Valid app data using the current schema.
	 */
	public static parseJSON(dataJSON: unknown): DataJSON {
		if (!Data.isRecord(dataJSON)) throw new AppError(AppErrorCodes.MALFORMED_DATA, "The app data must be a JSON object!");

		Data.validateSchemaVersion(dataJSON.schemaVersion);

		const vsVersionsPaths = dataJSON.vsVersionsPaths ?? [];
		const vsInstancesPaths = dataJSON.vsInstancesPaths ?? [];

		Data.validatePaths(vsVersionsPaths, "Vintage Story Versions");
		Data.validatePaths(vsInstancesPaths, "Vintage Story Instances");

		return {
			schemaVersion: Data.SCHEMA_VERSION,
			vsVersionsPaths,
			vsInstancesPaths
		};
	}

	private static validateSchemaVersion(schemaVersion: unknown): void {
		if (schemaVersion === undefined) return;
		if (schemaVersion === Data.SCHEMA_VERSION) return;

		throw new AppError(AppErrorCodes.MALFORMED_DATA, `The app data schema version ${String(schemaVersion)} is not supported!`);
	}

	private static validatePaths(paths: unknown, name: string): asserts paths is string[] {
		const pathsAreValid = Array.isArray(paths) && paths.every((path) => typeof path === "string" && path !== "");

		if (!pathsAreValid) throw new AppError(AppErrorCodes.MALFORMED_DATA, `The ${name} paths must be an array of non-empty strings!`);
	}

	private static isRecord(value: unknown): value is Record<string, unknown> {
		return typeof value === "object" && value !== null && !Array.isArray(value);
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Registers a Vintage Story Version and queues its installation without waiting for it to finish.
	 * @param version The Rustory API Vintage Story Version to install.
	 * @param versionsDir The directory containing shared Vintage Story Versions.
	 */
	public async queueVsVersionInstallation(version: RustoryApiVSVersion, versionsDir: Directory): Promise<void> {
		const vsVersion = await this.getOrCreateVsVersion(version, versionsDir);

		if (vsVersion.state === VSVersionState.INSTALLED) return;

		const installation = this.getOrStartVsVersionInstallation(vsVersion, version);
		void installation.catch(() => undefined);
	}

	/**
	 * Returns an installed Vintage Story Version, waiting for or starting its installation when necessary.
	 * Unlike queueVsVersionInstallation(), installation failures are propagated to the caller so a launch can stop safely.
	 * @param version The Rustory API Vintage Story Version required by the instance.
	 * @param versionsDir The directory containing shared Vintage Story Versions.
	 * @returns The installed Vintage Story Version.
	 */
	public async ensureVsVersionInstalled(version: RustoryApiVSVersion, versionsDir: Directory): Promise<VSVersion> {
		const vsVersion = await this.getOrCreateVsVersion(version, versionsDir);

		if (vsVersion.state === VSVersionState.INSTALLED) return vsVersion;

		const installation = this.getOrStartVsVersionInstallation(vsVersion, version);
		await installation;

		const versionIsInstalled = vsVersion.state === VSVersionState.INSTALLED;
		if (!versionIsInstalled)
			throw new AppError(
				AppErrorCodes.GENERIC_ERROR,
				`The Vintage Story Version ${vsVersion.version} installation finished without an installed state!`
			);

		return vsVersion;
	}

	private async getOrCreateVsVersion(version: RustoryApiVSVersion, versionsDir: Directory): Promise<VSVersion> {
		const registeredVersion = this.vsVersions.find((candidate) => candidate.version === version.version);
		if (registeredVersion !== undefined) return registeredVersion;

		const currentRegistration = this._vsVersionRegistrations.get(version.version);
		if (currentRegistration !== undefined) return await currentRegistration;

		const registration = this.registerVsVersion(version, versionsDir).finally(() => this._vsVersionRegistrations.delete(version.version));
		this._vsVersionRegistrations.set(version.version, registration);

		return await registration;
	}

	private async registerVsVersion(version: RustoryApiVSVersion, versionsDir: Directory): Promise<VSVersion> {
		const versionPath = await versionsDir.join(version.version);
		const versionDir = await Directory.create(versionPath);
		const vsVersion = await VSVersion.create({ version: version.version, dir: versionDir, state: VSVersionState.NOT_INSTALLED });
		await this.setVsVersions([...this.vsVersions, vsVersion]);

		return vsVersion;
	}

	private getOrStartVsVersionInstallation(vsVersion: VSVersion, version: RustoryApiVSVersion): Promise<void> {
		const currentInstallation = this._vsVersionInstallations.get(version.version);
		if (currentInstallation !== undefined) return currentInstallation;

		const installation = this.installVsVersion(vsVersion, version).finally(() => this._vsVersionInstallations.delete(version.version));
		this._vsVersionInstallations.set(version.version, installation);

		return installation;
	}

	private async installVsVersion(vsVersion: VSVersion, version: RustoryApiVSVersion): Promise<void> {
		try {
			await Logger.info(`Installing Vintage Story Version ${vsVersion.version}...`);
			await vsVersion.install(version);
			await this.save();
		} catch (err) {
			vsVersion.state = VSVersionState.NOT_INSTALLED;

			try {
				await this.save();
			} catch (saveError) {
				await Data.logBackgroundError(`There was an error saving the failed installation state of ${vsVersion.version}: ${saveError}`);
			}

			await Data.logBackgroundError(`There was an error installing Vintage Story Version ${vsVersion.version}: ${err}`);

			if (err instanceof AppError) throw err;
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error installing Vintage Story Version ${vsVersion.version}!`, { cause: err });
		}
	}

	private static async logBackgroundError(message: string): Promise<void> {
		try {
			await Logger.error(message);
		} catch {
			// Background installation errors must always be consumed.
		}
	}

	/**
	 * Sets the new Vintage Story Versions and saves them to the data file.
	 * @param vsVersions The new Vintage Story Versions
	 */
	public async setVsVersions(vsVersions: VSVersion[]): Promise<void> {
		try {
			Logger.debug("Setting new Vintage Story Versions...");

			this._vsVersions = vsVersions;

			await this.save();
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error saving the new Vintage Story Versions: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error saving the new Vintage Story Versions!");
		}
	}

	/**
	 * Sets the new Vintage Story Instances and saves them to the data file.
	 * @param vsInstances The new Vintage Story Instances
	 */
	public async setVsInstances(vsInstances: VSInstance[]): Promise<void> {
		try {
			Logger.debug("Setting new Vintage Story Instances...");

			this._vsInstances = vsInstances;

			await this.save();
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error saving the new Vintage Story Instances: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error saving the new Vintage Story Instances!");
		}
	}

	/**
	 * Saves the data to the data file.
	 */
	public async save(): Promise<void> {
		try {
			Logger.debug("Saving data...");

			const JSON = await this.exportToJSON();

			await this._file.writeJSON(JSON);
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error saving the data: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error saving the data!");
		}
	}

	/**
	 * Exports the data to a JSON.
	 * @returns A JSON with the data.
	 */
	private async exportToJSON(): Promise<DataJSON> {
		return {
			schemaVersion: Data.SCHEMA_VERSION,
			vsVersionsPaths: this._vsVersions.map((vsVersion) => vsVersion.dir.path),
			vsInstancesPaths: this._vsInstances.map((vsInstance) => vsInstance.dir.path)
		};
	}
}
