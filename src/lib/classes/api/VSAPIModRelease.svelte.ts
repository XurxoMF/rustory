/**
 * Mod Release queried from ModDB.
 */
export class VSAPIModRelease {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(vsApiModRelease: {
		releaseid: number;
		mainfile: string;
		filename: string;
		fileid: number;
		downloads: number;
		tags: string[];
		modidstr: string;
		modversion: string;
		created: string;
		changelog: string;
	}) {
		this._releaseid = vsApiModRelease.releaseid;
		this._mainfile = vsApiModRelease.mainfile;
		this._filename = vsApiModRelease.filename;
		this._fileid = vsApiModRelease.fileid;
		this._downloads = vsApiModRelease.downloads;
		this._tags = vsApiModRelease.tags;
		this._modidstr = vsApiModRelease.modidstr;
		this._modversion = vsApiModRelease.modversion;
		this._created = vsApiModRelease.created;
		this._changelog = vsApiModRelease.changelog;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the release.
	 */
	private _releaseid: number;

	/**
	 * The main file of the release.
	 */
	private _mainfile: string;

	/**
	 * The filename of the release.
	 */
	private _filename: string;

	/**
	 * The id of the file.
	 */
	private _fileid: number;

	/**
	 * The downloads of the release.
	 */
	private _downloads: number;

	/**
	 * The tags of the release.
	 */
	private _tags: string[];

	/**
	 * The modidstr of the release.
	 */
	private _modidstr: string;

	/**
	 * The modversion of the release.
	 */
	private _modversion: string;

	/**
	 * The created of the release.
	 */
	private _created: string;

	/**
	 * The changelog of the release.
	 */
	private _changelog: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the release.
	 */
	public get releaseid(): number {
		return this._releaseid;
	}

	/**
	 * The main file of the release.
	 */
	public get mainfile(): string {
		return this._mainfile;
	}

	/**
	 * The filename of the release.
	 */
	public get filename(): string {
		return this._filename;
	}

	/**
	 * The id of the file.
	 */
	public get fileid(): number {
		return this._fileid;
	}

	/**
	 * The downloads of the release.
	 */
	public get downloads(): number {
		return this._downloads;
	}

	/**
	 * The tags of the release.
	 */
	public get tags(): string[] {
		return this._tags;
	}

	/**
	 * The modidstr of the release.
	 */
	public get modidstr(): string {
		return this._modidstr;
	}

	/**
	 * The modversion of the release.
	 */
	public get modversion(): string {
		return this._modversion;
	}

	/**
	 * The created of the release.
	 */
	public get created(): string {
		return this._created;
	}

	/**
	 * The changelog of the release.
	 */
	public get changelog(): string {
		return this._changelog;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
