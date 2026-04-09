/**
 * Mod Screenshot queried from the ModDB.
 */
export class VSAPIModScreenshot {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(vsApiModScreenshot: { fileid: number; mainfile: string; filename: string; thumbnailfile: string; createdat: string }) {
		this._fileid = vsApiModScreenshot.fileid;
		this._mainfile = vsApiModScreenshot.mainfile;
		this._filename = vsApiModScreenshot.filename;
		this._thumbnailfile = vsApiModScreenshot.thumbnailfile;
		this._createdat = vsApiModScreenshot.createdat;
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
