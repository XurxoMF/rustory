/**
 * JSON of the Rustory API Vintage Story Version.
 */
export type RAPIVSVersionJSON = {
	version: string;
	type: "pre" | "rc" | "stable";
	releaseDate: number;
	importedDate: number;
	windows: string;
	windowsSha: string;
	linux: string;
	linuxSha: string;
	macos: string;
	macosSha: string;
};

/**
 * Version queried from the Rustory API.
 */
export class RAPIVSVersion {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(rApiVsVersion: {
		version: string;
		type: "pre" | "rc" | "stable";
		releaseDate: number;
		importedDate: number;
		windows: string;
		windowsSha: string;
		linux: string;
		linuxSha: string;
		macos: string;
		macosSha: string;
	}) {
		this._version = rApiVsVersion.version;
		this._type = rApiVsVersion.type;
		this._releaseDate = rApiVsVersion.releaseDate;
		this._importedDate = rApiVsVersion.importedDate;
		this._windows = rApiVsVersion.windows;
		this._windowsSha = rApiVsVersion.windowsSha;
		this._linux = rApiVsVersion.linux;
		this._linuxSha = rApiVsVersion.linuxSha;
		this._macos = rApiVsVersion.macos;
		this._macosSha = rApiVsVersion.macosSha;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The version string, e.g. "1.15.4".
	 */
	private _version: string;

	/**
	 * The type of the version.
	 */
	private _type: "pre" | "rc" | "stable";

	/**
	 * The release date of the version.
	 */
	private _releaseDate: number;

	/**
	 * The import date of the version.
	 */
	private _importedDate: number;

	/**
	 * The download link for Windows.
	 */
	private _windows: string;

	/**
	 * The sha256 checksum for Windows.
	 */
	private _windowsSha: string;

	/**
	 * The download link for Linux.
	 */
	private _linux: string;

	/**
	 * The sha256 checksum for Linux.
	 */
	private _linuxSha: string;

	/**
	 * The download link for macOS.
	 */
	private _macos: string;

	/**
	 * The sha256 checksum for macOS.
	 */
	private _macosSha: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The version string, e.g. "1.15.4".
	 */
	public get version(): string {
		return this._version;
	}

	/**
	 * The type of the version.
	 */
	public get type(): "pre" | "rc" | "stable" {
		return this._type;
	}

	/**
	 * The release date of the version.
	 */
	public get releaseDate(): number {
		return this._releaseDate;
	}

	/**
	 * The import date of the version.
	 */
	public get importedDate(): number {
		return this._importedDate;
	}

	/**
	 * The download link for Windows.
	 */
	public get windows(): string {
		return this._windows;
	}

	/**
	 * The sha256 checksum for Windows.
	 */
	public get windowsSha(): string {
		return this._windowsSha;
	}

	/**
	 * The download link for Linux.
	 */
	public get linux(): string {
		return this._linux;
	}

	/**
	 * The sha256 checksum for Linux.
	 */
	public get linuxSha(): string {
		return this._linuxSha;
	}

	/**
	 * The download link for macOS.
	 */
	public get macos(): string {
		return this._macos;
	}

	/**
	 * The sha256 checksum for macOS.
	 */
	public get macosSha(): string {
		return this._macosSha;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
