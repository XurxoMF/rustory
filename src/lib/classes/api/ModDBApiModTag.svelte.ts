/**
 * JSON of the ModDB API Mod Tag.
 */
export type ModDBApiModTagJSON = {
	tagid: number;
	name: string;
	color: string;
};

/**
 * ModDB API Mod Tag fetched from the ModDB.
 */
export class ModDBApiModTag {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(modDBApiModTag: { tagid: number; name: string; color: string }) {
		this._tagid = modDBApiModTag.tagid;
		this._name = modDBApiModTag.name;
		this._color = modDBApiModTag.color;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the tag.
	 */
	private _tagid: number;

	/**
	 * The name of the tag.
	 */
	private _name: string;

	/**
	 * The color of the tag.
	 */
	private _color: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the tag.
	 */
	public get tagid(): number {
		return this._tagid;
	}

	/**
	 * The name of the tag.
	 */
	public get name(): string {
		return this._name;
	}

	/**
	 * The color of the tag.
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
