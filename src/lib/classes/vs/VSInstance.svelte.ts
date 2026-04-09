import type { VSInstanceBackup } from "$lib/classes/vs/VSInstanceBackup.svelte";
import type { VSMod } from "$lib/classes/vs/VSMod.svelte";

/**
 * VS Instance.
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

	public constructor(vsInstance: {
		id: string;
		name: string;
		path: string;
		version: string;
		mods: VSMod[];
		backups: VSInstanceBackup[];
		icon: boolean;
		startParams: string;
		backupsLimit: number;
		backupsAuto: boolean;
		compressionLevel: number;
		lastTimePlayed: number;
		totalTimePlayed: number;
		mesaGlThread: boolean;
		envVars: string;
		state?: VSInstanceState | undefined;
	}) {
		this._id = vsInstance.id;
		this._name = $state(vsInstance.name);
		this._path = vsInstance.path;
		this._version = $state(vsInstance.version);
		this._mods = $state(vsInstance.mods);
		this._backups = $state(vsInstance.backups);
		this._icon = $state(vsInstance.icon);
		this._startParams = $state(vsInstance.startParams);
		this._backupsLimit = $state(vsInstance.backupsLimit);
		this._backupsAuto = $state(vsInstance.backupsAuto);
		this._compressionLevel = $state(vsInstance.compressionLevel);
		this._lastTimePlayed = $state(vsInstance.lastTimePlayed);
		this._totalTimePlayed = $state(vsInstance.totalTimePlayed);
		this._mesaGlThread = $state(vsInstance.mesaGlThread);
		this._envVars = $state(vsInstance.envVars);
		this._state = $state(vsInstance.state ?? VSInstanceState.STOPPED);
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the VS Instance.
	 */
	private _id: string;

	/**
	 * The name of the VS Instance.
	 */
	private _name: string;

	/**
	 * The path of the VS Instance.
	 */
	private _path: string;

	/**
	 * The version of the VS Instance.
	 */
	private _version: string;

	/**
	 * The mods of the VS Instance.
	 */
	private _mods: VSMod[];

	/**
	 * The backups of the VS Instance.
	 */
	private _backups: VSInstanceBackup[];

	/**
	 * If the VS Instance has an icon or not.
	 */
	private _icon: boolean;

	/**
	 * The start parameters of the VS Instance.
	 */
	private _startParams: string;

	/**
	 * The backups limit of the VS Instance.
	 */
	private _backupsLimit: number;

	/**
	 * The backups auto of the VS Instance.
	 */
	private _backupsAuto: boolean;

	/**
	 * The compression level of the VS Instance.
	 */
	private _compressionLevel: number;

	/**
	 * The last time played of the VS Instance.
	 */
	private _lastTimePlayed: number;

	/**
	 * The total time played of the VS Instance.
	 */
	private _totalTimePlayed: number;

	/**
	 * The mesa gl thread of the VS Instance.
	 */
	private _mesaGlThread: boolean;

	/**
	 * The env vars of the VS Instance.
	 */
	private _envVars: string;

	/**
	 * The state of the VS Instance.
	 */
	private _state: VSInstanceState;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the VS Instance.
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * The name of the VS Instance.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The name of the VS Instance.
	 */
	public set name(name: string) {
		this._name = name;
	}

	/**
	 * The path of the VS Instance.
	 */
	public get path(): string {
		return this._path;
	}

	/**
	 * The version of the VS Instance.
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * The version of the VS Instance.
	 */
	public set version(version: string) {
		this._version = version;
	}

	/**
	 * The mods of the VS Instance.
	 */
	public get mods(): VSMod[] {
		return this._mods;
	}

	/**
	 * The mods of the VS Instance.
	 */
	public set mods(mods: VSMod[]) {
		this._mods = mods;
	}

	/**
	 * The backups of the VS Instance.
	 */
	public get backups(): VSInstanceBackup[] {
		return this._backups;
	}

	/**
	 * The backups of the VS Instance.
	 */
	public set backups(backups: VSInstanceBackup[]) {
		this._backups = backups;
	}

	/**
	 * If the VS Instance has an icon or not.
	 */
	public get icon(): boolean {
		return this._icon;
	}

	/**
	 * If the VS Instance has an icon or not.
	 */
	public set icon(icon: boolean) {
		this._icon = icon;
	}

	/**
	 * The start parameters of the VS Instance.
	 */
	public get startParams(): string {
		return this._startParams;
	}

	/**
	 * The start parameters of the VS Instance.
	 */
	public set startParams(startParams: string) {
		this._startParams = startParams;
	}

	/**
	 * The backups limit of the VS Instance.
	 */
	public get backupsLimit(): number {
		return this._backupsLimit;
	}

	/**
	 * The backups limit of the VS Instance.
	 */
	public set backupsLimit(backupsLimit: number) {
		this._backupsLimit = backupsLimit;
	}

	/**
	 * The backups auto of the VS Instance.
	 */
	public get backupsAuto(): boolean {
		return this._backupsAuto;
	}

	/**
	 * The backups auto of the VS Instance.
	 */
	public set backupsAuto(backupsAuto: boolean) {
		this._backupsAuto = backupsAuto;
	}

	/**
	 * The compression level of the VS Instance.
	 */
	public get compressionLevel(): number {
		return this._compressionLevel;
	}

	/**
	 * The compression level of the VS Instance.
	 */
	public set compressionLevel(compressionLevel: number) {
		this._compressionLevel = compressionLevel;
	}

	/**
	 * The last time played of the VS Instance.
	 */
	public get lastTimePlayed(): number {
		return this._lastTimePlayed;
	}

	/**
	 * The last time played of the VS Instance.
	 */
	public set lastTimePlayed(lastTimePlayed: number) {
		this._lastTimePlayed = lastTimePlayed;
	}

	/**
	 * The total time played of the VS Instance.
	 */
	public get totalTimePlayed(): number {
		return this._totalTimePlayed;
	}

	/**
	 * The total time played of the VS Instance.
	 */
	public set totalTimePlayed(totalTimePlayed: number) {
		this._totalTimePlayed = totalTimePlayed;
	}

	/**
	 * The mesa gl thread of the VS Instance.
	 */
	public get mesaGlThread(): boolean {
		return this._mesaGlThread;
	}

	/**
	 * The mesa gl thread of the VS Instance.
	 */
	public set mesaGlThread(mesaGlThread: boolean) {
		this._mesaGlThread = mesaGlThread;
	}

	/**
	 * The env vars of the VS Instance.
	 */
	public get envVars(): string {
		return this._envVars;
	}

	/**
	 * The env vars of the VS Instance.
	 */
	public set envVars(envVars: string) {
		this._envVars = envVars;
	}

	/**
	 * The state of the VS Instance.
	 */
	public get state(): VSInstanceState {
		return this._state;
	}

	/**
	 * The state of the VS Instance.
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
}

/**
 * State of the VS Instance.
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
