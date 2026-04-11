import { File } from "$lib/classes/utils/File.svelte";

/**
 * VS Instance Backup.
 */
export class VSInstanceBackup {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(vsInstanceBackup: { id: string; vsInstanceId: string; date: number; file: File; state?: VSInstanceBackupState | undefined }) {
		this._id = vsInstanceBackup.id;
		this._vsInstanceId = vsInstanceBackup.vsInstanceId;
		this._date = vsInstanceBackup.date;
		this._file = vsInstanceBackup.file;
		this._state = $state(vsInstanceBackup.state ?? VSInstanceBackupState.READY);
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the VS Instance Backup.
	 */
	private _id: string;

	/**
	 * The id of the VS Instance this VS Instance Backup is from.
	 */
	private _vsInstanceId: string;

	/**
	 * The date of the VS Instance Backup.
	 */
	private _date: number;

	/**
	 * The file of the VS Instance Backup.
	 */
	private _file: File;

	/**
	 * The state of the VS Instance Backup.
	 */
	private _state: VSInstanceBackupState;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the VS Instance Backup.
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * The id of the VS Instance this VS Instance Backup is from.
	 */
	public get vsInstanceId(): string {
		return this._vsInstanceId;
	}

	/**
	 * The date of the VS Instance Backup.
	 */
	public get date(): number {
		return this._date;
	}

	/**
	 * The file of the VS Instance Backup.
	 */
	public get file(): File {
		return this._file;
	}

	/**
	 * The state of the VS Instance Backup.
	 */
	public get state(): VSInstanceBackupState {
		return this._state;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}

/**
 * State of the VS Instance Backup.
 */
export enum VSInstanceBackupState {
	CREATING = "creating",
	DELETING = "deleting",
	RESTORING = "restoring",
	READY = "ready"
}
