export class Loader {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	constructor() {
		this._showLoader = $state(true);
		this._loadApp = $state(false);
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * If the loader must be shown.
	 */
	private _showLoader;

	/**
	 * If the app must be loaded.
	 */
	private _loadApp;

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * If the loader must be shown.
	 */
	public get showLoader(): boolean {
		return this._showLoader;
	}

	/**
	 * If the loader must be shown.
	 */
	public set showLoader(showLoader: boolean) {
		this._showLoader = showLoader;
	}

	/**
	 * If the app must be loaded.
	 */
	public get loadApp(): boolean {
		return this._loadApp;
	}

	/**
	 * If the app must be loaded.
	 */
	public set loadApp(loadApp: boolean) {
		this._loadApp = loadApp;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
