/**
 * Store for the some UI related functiond and data.
 */
export class UI {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	private static _instance: UI = new UI();

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	public static get instance(): UI {
		return UI._instance;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {
		this._contentRef = $state(null);
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * Ref to the main content container. Contains the scroll and other things.
	 */
	private _contentRef: HTMLElement | null;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************

	/**
	 * Ref to the main content container. Contains the scroll and other things.
	 */
	public get contentRef(): HTMLElement | null {
		return this._contentRef;
	}

	/**
	 * Ref to the main content container. Contains the scroll and other things.
	 */
	public set contentRef(value: HTMLElement | null) {
		this._contentRef = value;
	}
}
