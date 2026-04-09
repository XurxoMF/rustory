/**
 * Mod Author info queried from the ModDB.
 */
export class VSAPIModAuthor {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	public constructor(vsApiModAuthor: { userid: string; name: string }) {
		this._userid = vsApiModAuthor.userid;
		this._name = vsApiModAuthor.name;
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
