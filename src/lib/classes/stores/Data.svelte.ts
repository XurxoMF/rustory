import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { Info } from "$lib/classes/stores/Info.svelte";
import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";
import { Logger } from "$lib/classes/utils/Logger.svelte";

import { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
import { VSVersion } from "$lib/classes/vs/VSVersion.svelte";

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

						const vsVersion = await VSVersion.fromDir(dir);

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
