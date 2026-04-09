import { debug, error } from "@tauri-apps/plugin-log";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/RustoryError.svelte";

/**
 * Each breadcrumb segment. It's the same as the path segments.
 *
 * @example
 * Path: /foo/bar
 * Segments: [{ label: 'foo', href: '/foo' }, { label: 'bar', href: '/foo/bar' }]
 */
export type BreadcrumbsSegment = {
	label: string;
	href: string;
};

/**
 * Breadcrums store.
 */
export class Breadcrumbs {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {
		this._segments = $state([]);
	}

	/**
	 * Loads the app breadcrumbs.
	 * @returns An instance of the breadcrums of the app.
	 */
	public static async init(): Promise<Breadcrumbs> {
		try {
			return new Breadcrumbs();
		} catch (err) {
			error("There was an error initializating the breadcrumbs!");
			debug(`There was an error initializating the breadcrumbs:\n${JSON.stringify(err)}`);
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error initializating the breadcrumbs!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * Breadcrumbs from the current page. Set them manually on each page.
	 */
	private _segments: BreadcrumbsSegment[];

	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * Breadcrumbs from the current page. Set them manually on each page.
	 */
	public get segments(): BreadcrumbsSegment[] {
		return this._segments;
	}

	/**
	 * Breadcrumbs from the current page. Set them manually on each page.
	 */
	public set segments(segments: BreadcrumbsSegment[]) {
		this._segments = segments;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
