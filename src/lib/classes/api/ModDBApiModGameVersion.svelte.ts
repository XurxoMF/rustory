/**
 * JSON of the ModDB API Mod Game Version.
 */
export type ModDBApiModGameVersionJSON = {
	tagid: string;
	name: string;
	color: string;
};

/**
 * ModDB API Mod Game Version fetched from the ModDB.
 */
export class ModDBApiModGameVersion {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(modDBApiModGameVersion: { tagid: string; name: string; color: string }) {
		this._tagid = modDBApiModGameVersion.tagid;
		this._name = modDBApiModGameVersion.name;
		this._color = modDBApiModGameVersion.color;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the game version.
	 */
	private _tagid: string;

	/**
	 * The name of the game version.
	 */
	private _name: string;

	/**
	 * The color of the game version.
	 */
	private _color: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the game version.
	 */
	public get tagid(): string {
		return this._tagid;
	}

	/**
	 * The name of the game version.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The color of the game version.
	 */
	public get color(): string {
		return this._color;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
