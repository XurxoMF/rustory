/**
 * JSON of the ModDB API Mod Screenshot.
 */
export type ModDBApiModScreenshotJSON = {
	fileid: number;
	mainfile: string;
	filename: string;
	thumbnailfile: string;
	createdat: string;
};

/**
 * ModDB API Mod Screenshot fetched from the ModDB.
 */
export class ModDBApiModScreenshot {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(modDBApiModScreenshot: { fileid: number; mainfile: string; filename: string; thumbnailfile: string; createdat: string }) {
		this._fileid = modDBApiModScreenshot.fileid;
		this._mainfile = modDBApiModScreenshot.mainfile;
		this._filename = modDBApiModScreenshot.filename;
		this._thumbnailfile = modDBApiModScreenshot.thumbnailfile;
		this._createdat = modDBApiModScreenshot.createdat;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the screenshot.
	 */
	private _fileid: number;

	/**
	 * The main file of the screenshot.
	 */
	private _mainfile: string;

	/**
	 * The filename of the screenshot.
	 */
	private _filename: string;

	/**
	 * The thumbnail file of the screenshot.
	 */
	private _thumbnailfile: string;

	/**
	 * The creation date of the screenshot.
	 */
	private _createdat: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the screenshot.
	 */
	public get fileid(): number {
		return this._fileid;
	}

	/**
	 * The main file of the screenshot.
	 */
	public get mainfile(): string {
		return this._mainfile;
	}

	/**
	 * The filename of the screenshot.
	 */
	public get filename(): string {
		return this._filename;
	}

	/**
	 * The thumbnail file of the screenshot.
	 */
	public get thumbnailfile(): string {
		return this._thumbnailfile;
	}

	/**
	 * The creation date of the screenshot.
	 */
	public get createdat(): string {
		return this._createdat;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
