import { App } from "$lib/classes/App.svelte";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";
import { Zip } from "$lib/classes/utils/Zip.svelte";

import type { VSInstanceBackup } from "$lib/classes/vs/VSInstanceBackup.svelte";
import { VSMod } from "$lib/classes/vs/VSMod.svelte";

/**
 * State of the Vintage Story Instance.
 */
export enum VSInstanceState {
	STOPPED = "stopped",
	PLAYING_CLIENT = "playing_client",
	PLAYING_SERVER = "playing_server",
	BACKUPING = "backuping",
	DELETING = "deleting",
	ERROR = "error"
}

/**
 * JSON of the Vintage Story Instance.
 */
export type VSInstanceJSON = {
	id: string;
	name: string;
	description: string;
	version: string;
	startParams: string;
	backupsLimit: number;
	backupsAuto: boolean;
	backupsCompressionLevel: number;
	lastTimePlayed: number;
	totalTimePlayed: number;
	mesaGlThread: boolean;
	envVars: string;
};

/**
 * Vinstage Story Instance.
 */
export class VSInstance {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor(vsInstance: {
		file: File;
		id: string;
		name: string;
		description: string;
		dir: Directory;
		dataDir: Directory;
		backupsDir: Directory;
		modsDir: Directory;
		version: string;
		mods: VSMod[];
		backups: VSInstanceBackup[];
		startParams: string;
		backupsLimit: number;
		backupsAuto: boolean;
		backupsCompressionLevel: number;
		lastTimePlayed: number;
		totalTimePlayed: number;
		mesaGlThread: boolean;
		envVars: string;
		state?: VSInstanceState | undefined;
	}) {
		this._file = vsInstance.file;
		this._id = vsInstance.id;
		this._name = $state(vsInstance.name);
		this._description = $state(vsInstance.description);
		this._dir = vsInstance.dir;
		this._dataDir = vsInstance.dataDir;
		this._backupsDir = vsInstance.backupsDir;
		this._modsDir = vsInstance.modsDir;
		this._version = $state(vsInstance.version);
		this._mods = $state(vsInstance.mods);
		this._backups = $state(vsInstance.backups);
		this._startParams = $state(vsInstance.startParams);
		this._backupsLimit = $state(vsInstance.backupsLimit);
		this._backupsAuto = $state(vsInstance.backupsAuto);
		this._backupsCompressionLevel = $state(vsInstance.backupsCompressionLevel);
		this._lastTimePlayed = $state(vsInstance.lastTimePlayed);
		this._totalTimePlayed = $state(vsInstance.totalTimePlayed);
		this._mesaGlThread = $state(vsInstance.mesaGlThread);
		this._envVars = $state(vsInstance.envVars);
		this._state = $state(vsInstance.state ?? VSInstanceState.STOPPED);
	}

	/**
	 * Creates a new Vintage Story Instance instance.
	 * @param path The path of the file.
	 * @returns The File instance.
	 */
	public static async create(vsInstance: {
		file: File;
		id: string;
		name: string;
		description: string;
		dir: Directory;
		dataDir: Directory;
		backupsDir: Directory;
		modsDir: Directory;
		version: string;
		startParams: string;
		backupsLimit: number;
		backupsAuto: boolean;
		backupsCompressionLevel: number;
		lastTimePlayed: number;
		totalTimePlayed: number;
		mesaGlThread: boolean;
		envVars: string;
	}): Promise<VSInstance> {
		try {
			return new VSInstance({
				file: vsInstance.file,
				id: vsInstance.id,
				name: vsInstance.name,
				description: vsInstance.description,
				dir: vsInstance.dir,
				dataDir: vsInstance.dataDir,
				backupsDir: vsInstance.backupsDir,
				modsDir: vsInstance.modsDir,
				version: vsInstance.version,
				mods: [],
				backups: [],
				startParams: vsInstance.startParams,
				backupsLimit: vsInstance.backupsLimit,
				backupsAuto: vsInstance.backupsAuto,
				backupsCompressionLevel: vsInstance.backupsCompressionLevel,
				lastTimePlayed: vsInstance.lastTimePlayed,
				totalTimePlayed: vsInstance.totalTimePlayed,
				mesaGlThread: vsInstance.mesaGlThread,
				envVars: vsInstance.envVars,
				state: VSInstanceState.STOPPED
			});
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error creating the Vintage Story Instance: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error creating the Vintage Story Instance!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The Vintage Story Instance config file.
	 */
	private _file: File;

	/**
	 * The id of the Vintage Story Instance.
	 */
	private _id: string;

	/**
	 * The name of the Vintage Story Instance.
	 */
	private _name: string;

	/**
	 * The description of the Vintage Story Instance.
	 */
	private _description: string;

	/**
	 * The directory of the Vintage Story Instance.
	 */
	private _dir: Directory;

	/**
	 * The data directory of the Vintage Story Instance.
	 */
	private _dataDir: Directory;

	/**
	 * The backups directory of the Vintage Story Instance.
	 */
	private _backupsDir: Directory;

	/**
	 * The mods directory of the Vintage Story Instance.
	 */
	private _modsDir: Directory;

	/**
	 * The version of the Vintage Story Instance.
	 */
	private _version: string;

	/**
	 * The mods of the Vintage Story Instance.
	 */
	private _mods: VSMod[];

	/**
	 * The backups of the Vintage Story Instance.
	 */
	private _backups: VSInstanceBackup[];

	/**
	 * The start parameters of the Vintage Story Instance.
	 */
	private _startParams: string;

	/**
	 * The backups limit of the Vintage Story Instance.
	 */
	private _backupsLimit: number;

	/**
	 * The backups auto of the Vintage Story Instance.
	 */
	private _backupsAuto: boolean;

	/**
	 * The compression level of the Vintage Story Instance.
	 */
	private _backupsCompressionLevel: number;

	/**
	 * The last time played of the Vintage Story Instance.
	 */
	private _lastTimePlayed: number;

	/**
	 * The total time played of the Vintage Story Instance.
	 */
	private _totalTimePlayed: number;

	/**
	 * The mesa gl thread of the Vintage Story Instance.
	 */
	private _mesaGlThread: boolean;

	/**
	 * The env vars of the Vintage Story Instance.
	 */
	private _envVars: string;

	/**
	 * The state of the Vintage Story Instance.
	 */
	private _state: VSInstanceState;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The file of the Vintage Story Instance.
	 */
	public get file(): File {
		return this._file;
	}

	/**
	 * The id of the Vintage Story Instance.
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * The name of the Vintage Story Instance.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The name of the Vintage Story Instance.
	 */
	public set name(name: string) {
		this._name = name;
	}

	/**
	 * The description of the Vintage Story Instance.
	 */
	public get description(): string {
		return this._description;
	}

	/**
	 * The description of the Vintage Story Instance.
	 */
	public set description(description: string) {
		this._description = description;
	}

	/**
	 * The directory of the Vintage Story Instance.
	 */
	public get dir(): Directory {
		return this._dir;
	}

	/**
	 * The data directory of the Vintage Story Instance.
	 */
	public get dataDir(): Directory {
		return this._dataDir;
	}

	/**
	 * The backups directory of the Vintage Story Instance.
	 */
	public get backupsDir(): Directory {
		return this._backupsDir;
	}

	/**
	 * The mods directory of the Vintage Story Instance.
	 */
	public get modsDir(): Directory {
		return this._modsDir;
	}

	/**
	 * The version of the Vintage Story Instance.
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * The version of the Vintage Story Instance.
	 */
	public set version(version: string) {
		this._version = version;
	}

	/**
	 * The mods of the Vintage Story Instance.
	 */
	public get mods(): VSMod[] {
		return this._mods;
	}

	/**
	 * The mods of the Vintage Story Instance.
	 */
	public set mods(mods: VSMod[]) {
		this._mods = mods;
	}

	/**
	 * The backups of the Vintage Story Instance.
	 */
	public get backups(): VSInstanceBackup[] {
		return this._backups;
	}

	/**
	 * The backups of the Vintage Story Instance.
	 */
	public set backups(backups: VSInstanceBackup[]) {
		this._backups = backups;
	}

	/**
	 * The start parameters of the Vintage Story Instance.
	 */
	public get startParams(): string {
		return this._startParams;
	}

	/**
	 * The start parameters of the Vintage Story Instance.
	 */
	public set startParams(startParams: string) {
		this._startParams = startParams;
	}

	/**
	 * The backups limit of the Vintage Story Instance.
	 */
	public get backupsLimit(): number {
		return this._backupsLimit;
	}

	/**
	 * The backups limit of the Vintage Story Instance.
	 */
	public set backupsLimit(backupsLimit: number) {
		this._backupsLimit = backupsLimit;
	}

	/**
	 * The backups auto of the Vintage Story Instance.
	 */
	public get backupsAuto(): boolean {
		return this._backupsAuto;
	}

	/**
	 * The backups auto of the Vintage Story Instance.
	 */
	public set backupsAuto(backupsAuto: boolean) {
		this._backupsAuto = backupsAuto;
	}

	/**
	 * The compression level of the Vintage Story Instance.
	 */
	public get backupsCompressionLevel(): number {
		return this._backupsCompressionLevel;
	}

	/**
	 * The compression level of the Vintage Story Instance.
	 */
	public set backupsCompressionLevel(backupsCompressionLevel: number) {
		this._backupsCompressionLevel = backupsCompressionLevel;
	}

	/**
	 * The last time played of the Vintage Story Instance.
	 */
	public get lastTimePlayed(): number {
		return this._lastTimePlayed;
	}

	/**
	 * The last time played of the Vintage Story Instance.
	 */
	public set lastTimePlayed(lastTimePlayed: number) {
		this._lastTimePlayed = lastTimePlayed;
	}

	/**
	 * The total time played of the Vintage Story Instance.
	 */
	public get totalTimePlayed(): number {
		return this._totalTimePlayed;
	}

	/**
	 * The total time played of the Vintage Story Instance.
	 */
	public set totalTimePlayed(totalTimePlayed: number) {
		this._totalTimePlayed = totalTimePlayed;
	}

	/**
	 * The mesa gl thread of the Vintage Story Instance.
	 */
	public get mesaGlThread(): boolean {
		return this._mesaGlThread;
	}

	/**
	 * The mesa gl thread of the Vintage Story Instance.
	 */
	public set mesaGlThread(mesaGlThread: boolean) {
		this._mesaGlThread = mesaGlThread;
	}

	/**
	 * The env vars of the Vintage Story Instance.
	 */
	public get envVars(): string {
		return this._envVars;
	}

	/**
	 * The env vars of the Vintage Story Instance.
	 */
	public set envVars(envVars: string) {
		this._envVars = envVars;
	}

	/**
	 * The state of the Vintage Story Instance.
	 */
	public get state(): VSInstanceState {
		return this._state;
	}

	/**
	 * The state of the Vintage Story Instance.
	 */
	public set state(state: VSInstanceState) {
		this._state = state;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	/**
	 * Loads a Vintage Story Instance from a directory.
	 * @param dir The directory to load the Vintage Story Instance from.
	 * @returns The Vintage Story Instance.
	 */
	public static async fromDir(dir: Directory): Promise<VSInstance> {
		try {
			App.logger.debug(`Loading the Vintage Story Instance from the directory ${dir.path}...`);

			const filePath = await dir.join("instance.json");
			const file = await File.create(filePath);

			if (!file.exists()) throw new AppError(AppErrorCodes.FILE_SYSTEM_ERROR, `There is no instance.json file in the directory ${dir.path}!`);

			const dataPath = await dir.join("Data");
			const dataDir = await Directory.create(dataPath);

			const backupsPath = await dir.join("Backups");
			const backupsDir = await Directory.create(backupsPath);

			const modsPath = await dataDir.join("Mods");
			const modsDir = await Directory.create(modsPath);

			App.logger.debug(`Reading the Vintage Story Instance data from the file ${file.path}...`);

			const vsInstanceJSON = await file.readJSON<Partial<VSInstanceJSON>>();

			if (vsInstanceJSON.id === undefined) throw new AppError(AppErrorCodes.MALFORMED_DATA, "The Vintage Story Instance ID is missing!");

			if (vsInstanceJSON.name === undefined) throw new AppError(AppErrorCodes.MALFORMED_DATA, "The Vintage Story Instance name is missing!");

			if (vsInstanceJSON.version === undefined) throw new AppError(AppErrorCodes.MALFORMED_DATA, "The Vintage Story Instance version is missing!");

			App.logger.debug(`Creating the Vintage Story Instance ${vsInstanceJSON.name} with the data from the file ${file.path}!`);

			const vsInstance = await VSInstance.create({
				file,
				id: vsInstanceJSON.id,
				name: vsInstanceJSON.name,
				description: vsInstanceJSON.description ?? "",
				dir,
				dataDir,
				backupsDir,
				modsDir,
				version: vsInstanceJSON.version,
				startParams: vsInstanceJSON.startParams ?? "",
				backupsLimit: vsInstanceJSON.backupsLimit ?? 3,
				backupsAuto: vsInstanceJSON.backupsAuto ?? false,
				backupsCompressionLevel: vsInstanceJSON.backupsCompressionLevel ?? 4,
				lastTimePlayed: vsInstanceJSON.lastTimePlayed ?? 0,
				totalTimePlayed: vsInstanceJSON.totalTimePlayed ?? 0,
				mesaGlThread: vsInstanceJSON.mesaGlThread ?? false,
				envVars: vsInstanceJSON.envVars ?? ""
			});

			App.logger.debug(`Finished creating the Vintage Story Instance ${vsInstanceJSON.name}!`);

			return vsInstance;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error loading the Vintage Story Instance from the directory ${dir.path}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error loading the Vintage Story Instance from the directory ${dir.path}!`);
		}
	}

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Deletes the Vintage Story Instance.
	 *
	 * NOTE: This doesn't delete the Instance from the App data store. You must remove it manually.
	 * @param deleteContents If the data, backups... should be deleted.
	 */
	public async delete(deleteContents: boolean): Promise<void> {
		try {
			App.logger.debug(`Deleting the Vintage Story Instance ${this._name}...`);

			this._state = VSInstanceState.DELETING;

			if (deleteContents) {
				App.logger.debug(`Delete contents selected! Deleting the Vintage Story Instance directory ${this._dir.path}...`);

				await this._dir.delete();

				App.logger.debug(`Deleted the Vintage Story Instance directory ${this._dir.path}!`);
			}

			App.logger.debug(`Deleted the Vintage Story Instance ${this._name}!`);
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error deleting the Vintage Story Instance ${this._name}: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, `There was an error deleting the Vintage Story Instance ${this._name}!`);
		}
	}

	/**
	 * Saves the Vintage Story Isntance to the instance.json file.
	 */
	public async save(): Promise<void> {
		try {
			App.logger.debug(`Saving the Vintage Story Instance ${this._name} to ${this._file.path}...`);

			const JSON = await this.exportToJSON();

			this._file.writeJSON(JSON);

			App.logger.debug(`Saved the Vintage Story Instance ${this._name} to ${this._file.path}!`);
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error saving the Vintage Story Instance: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error saving the Vintage Story Instance!");
		}
	}

	/**
	 * Loads the Vintage Story Mods of the Vintage Story Instance.
	 */
	public async loadMods(): Promise<VSMod[]> {
		try {
			App.logger.debug(`Loading the Vintage Story Mods of the Vintage Story Instance ${this._name}...`);

			const modsDirContents = await this._modsDir.getContents();

			const vsMods: VSMod[] = [];

			App.logger.debug(`Trying to load the Vintage Story Mods from ${modsDirContents.files.length} found files!`);

			await Promise.all(
				modsDirContents.files.map(async (modFile) => {
					if (modFile.path.endsWith(".zip")) {
						App.logger.debug(`Trying to load the Vintage Story Mod from the file ${modFile.path}...`);

						const zip = await Zip.create(modFile.path);

						const vsMod = await VSMod.fromZip(zip);

						App.logger.debug(`Loaded the Vintage Story Mod ${vsMod.name} from the file ${modFile.path}!`);

						vsMods.push(vsMod);
					}
				})
			);

			App.logger.debug(`Loaded ${vsMods.length} Vintage Story Mods of the Vintage Story Instance ${this._name}!`);

			return vsMods;
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error loading the Vintage Story Mods of the Vintage Story Instance ${this._name}: ${err}`);
			throw new AppError(
				AppErrorCodes.GENERIC_ERROR,
				`There was an error loading the Vintage Story Mods of the Vintage Story Instance ${this._name}!`
			);
		}
	}

	/**
	 * Exports the Vintage Story Instance to a JSON.
	 * @returns A JSON with the Vintage Story Instance.
	 */
	private async exportToJSON(): Promise<VSInstanceJSON> {
		return {
			id: this._id,
			name: this._name,
			description: this._description,
			version: this._version,
			startParams: this._startParams,
			backupsLimit: this._backupsLimit,
			backupsAuto: this._backupsAuto,
			backupsCompressionLevel: this._backupsCompressionLevel,
			lastTimePlayed: this._lastTimePlayed,
			totalTimePlayed: this._totalTimePlayed,
			mesaGlThread: this._mesaGlThread,
			envVars: this._envVars
		};
	}
}
