import { toast } from "svelte-sonner";

export class Toaster {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	/**
	 * The toast module.
	 */
	private static _toast = toast;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	/**
	 * The toast module.
	 */
	public static get toast() {
		return this._toast;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * The toast module.
	 */
	public get toast() {
		return Toaster._toast;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
