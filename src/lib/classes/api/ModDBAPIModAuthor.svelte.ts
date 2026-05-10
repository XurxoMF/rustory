/**
 * JSON of the ModDB API Mod Author.
 */
export type ModDBApiModAuthorJSON = {
	userid: string;
	name: string;
};

/**
 * ModDB API Mod Author fetched from the ModDB.
 */
export class ModDBApiModAuthor {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(modDBApiModAuthor: { userid: string; name: string }) {
		this._userid = modDBApiModAuthor.userid;
		this._name = modDBApiModAuthor.name;
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * The id of the author.
	 */
	private _userid: string;

	/**
	 * The name of the author.
	 */
	private _name: string;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The id of the author.
	 */
	public get userid(): string {
		return this._userid;
	}

	/**
	 * The name of the author.
	 */
	public get name(): string {
		return this._name;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
