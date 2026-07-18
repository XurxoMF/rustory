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

	private constructor() {}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
