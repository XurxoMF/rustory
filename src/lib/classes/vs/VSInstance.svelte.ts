import { error } from "@tauri-apps/plugin-log";

import { cleanPath } from "$lib/utils";

import { App } from "$lib/classes/App.svelte";
import type { VSInstanceBackup } from "$lib/classes/vs/VSInstanceBackup.svelte";
import type { VSMod } from "$lib/classes/vs/VSMod.svelte";
import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";
import { Directory } from "$lib/classes/utils/Directory.svelte";
import { File } from "$lib/classes/utils/File.svelte";

/**
 * State of the Vintage Story Instance.
 */
export enum VSInstanceState {
	STOPPED = "stopped",
	PLAYING_CLIENT = "playing_client",
	PLAYING_SERVER = "playing_server",
	BACKUPING = "backuping",
	INSTALLING_VERSION = "installing_version",
	DELETING = "deleting",
	ERROR = "error"
}

/**
 * JSON of the Vintage Story Instance.
 */
export type VSInstanceJSON = {
	id: string;
	name: string;
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
		dir: Directory;
		versionDir: Directory;
		dataDir: Directory;
		backupsDir: Directory;
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
		this._dir = vsInstance.dir;
		this._versionDir = vsInstance.versionDir;
		this._dataDir = vsInstance.dataDir;
		this._backupsDir = vsInstance.backupsDir;
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
		name: string;
		dir?: Directory | undefined;
		version: string;
		startParams: string;
		backupsLimit: number;
		backupsAuto: boolean;
		backupsCompressionLevel: number;
		mesaGlThread: boolean;
		envVars: string;
	}): Promise<VSInstance> {
		try {
			const id = crypto.randomUUID();

			const cleanName = cleanPath(vsInstance.name);
			const defaultPath = await App.config.vsInstancesDir.join(cleanName);
			const defaultDir = await Directory.create(defaultPath);

			const dir = vsInstance.dir ?? defaultDir;

			const versionPath = await dir.join("Version");
			const versionDir = await Directory.create(versionPath);

			const dataPath = await dir.join("Data");
			const dataDir = await Directory.create(dataPath);

			const backupsPath = await dir.join("Backups");
			const backupsDir = await Directory.create(backupsPath);

			const filePath = await dir.join("instance.json");
			const file = await File.create(filePath);

			return new VSInstance({
				file,
				id,
				name: vsInstance.name,
				dir,
				versionDir,
				dataDir,
				backupsDir,
				version: vsInstance.version,
				mods: [],
				backups: [],
				startParams: vsInstance.startParams,
				backupsLimit: vsInstance.backupsLimit,
				backupsAuto: vsInstance.backupsAuto,
				backupsCompressionLevel: vsInstance.backupsCompressionLevel,
				lastTimePlayed: 0,
				totalTimePlayed: 0,
				mesaGlThread: vsInstance.mesaGlThread,
				envVars: vsInstance.envVars,
				state: VSInstanceState.STOPPED
			});
		} catch (err) {
			error(`There was an error creating the file:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error creating the file!");
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
	 * The directory of the Vintage Story Instance.
	 */
	private _dir: Directory;

	/**
	 * The version directory of the Vintage Story Instance.
	 */
	private _versionDir: Directory;

	/**
	 * The data directory of the Vintage Story Instance.
	 */
	private _dataDir: Directory;

	/**
	 * The backups directory of the Vintage Story Instance.
	 */
	private _backupsDir: Directory;

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
	 * The directory of the Vintage Story Instance.
	 */
	public get dir(): Directory {
		return this._dir;
	}

	/**
	 * The version directory of the Vintage Story Instance.
	 */
	public get versionDir(): Directory {
		return this._versionDir;
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

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Saves the Vintage Story Isntance to the instance file.
	 */
	public async save(): Promise<void> {
		try {
			const JSON = await this.exportToJSON();

			this._file.writeJSON(JSON);
		} catch (err) {
			error(`There was an error saving the Vintage Story Instance:\n${err}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error saving the Vintage Story Instance!");
		}
	}

	// TODO: Implement this.
	/**
	 * Imports the Vintage Story Instance from a JSON file.
	 * @param data The JSON with the Vinatge Story Instance.
	 */
	// private async importFromJSON(data: Vintage Story InstanceJSON): Promise<void> {}

	/**
	 * Exports the Vintage Story Instance to a JSON.
	 * @returns A JSON with the Vintage Story Instance.
	 */
	private async exportToJSON(): Promise<VSInstanceJSON> {
		return {
			id: this._id,
			name: this._name,
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
