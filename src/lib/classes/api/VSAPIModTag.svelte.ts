/**
 * JSON of the Mod Tag queried from the ModDB.
 */
export type VSAPIModTagJSON = {
	tagid: number;
	name: string;
	color: string;
};

/**
 * Mod Tag queried from the ModDB.
 */
export class VSAPIModTag {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(vsApiModTag: { tagid: number; name: string; color: string }) {
		this._tagid = vsApiModTag.tagid;
		this._name = vsApiModTag.name;
		this._color = vsApiModTag.color;
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
