/**
 * JSON of the Mod Game Version queried from the ModDB.
 */
export type VSAPIModGameVersionJSON = {
	tagid: string;
	name: string;
	color: string;
};

/**
 * Mod Game Version queried from the ModDB.
 */
export class VSAPIModGameVersion {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(vsApiModGameVersion: { tagid: string; name: string; color: string }) {
		this._tagid = vsApiModGameVersion.tagid;
		this._name = vsApiModGameVersion.name;
		this._color = vsApiModGameVersion.color;
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
