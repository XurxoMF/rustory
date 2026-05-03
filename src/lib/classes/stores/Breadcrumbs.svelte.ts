import type { ResolvedPathname } from "$app/types";

import { App } from "$lib/classes/App.svelte";

import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

/**
 * Each breadcrumb segment. It's the same as the path segments.
 *
 * @example
 * Path: /foo/bar
 * Segments: [{ label: 'foo', href: resolve("/foo") }, { label: 'bar', href: resolve("/foo/[slug]", { slug: "1234" }) }]
 */
export type BreadcrumbsSegment = {
	label: string;
	href: ResolvedPathname;
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
			App.logger.debug("Initializing breadcrumbs...");

			return new Breadcrumbs();
		} catch (err) {
			App.logger.error(`There was an error initializating the breadcrumbs:\n${err}`);
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
