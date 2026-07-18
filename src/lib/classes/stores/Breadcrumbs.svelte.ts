import type { ResolvedPathname } from "$app/types";

import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";
import { Logger } from "$lib/classes/utils/Logger.svelte";

/**
 * Each breadcrumb segment. It's the same as the path segments.
 *
 * @example
 * Path: /foo/bar
 * Segments: [{ label: 'foo', href: resolve("/foo") }, { label: 'bar', href: resolve("/foo/[slug]", { slug: "1234" }) }]
 */
export type BreadcrumbsSegment = {
	label: string;
	href?: ResolvedPathname | undefined;
};

/**
 * Breadcrums store.
 */
export class Breadcrumbs {
	// ***********************
	// *  STATIC PROPERTIES  *
	// ***********************

	private static _instance: Breadcrumbs | undefined;

	// *******************************
	// *  STATIC GETTERS & SETTERS	 *
	// *******************************

	public static get instance(): Breadcrumbs {
		if (Breadcrumbs._instance === undefined) throw new AppError(AppErrorCodes.NOT_INITIALIZED, "Breadcrumbs not initialized!");
		return Breadcrumbs._instance;
	}

	// ************************
	// *  CONSTRUCTOR & INIT  *
	// ************************

	private constructor() {
		this._segments = $state(null);
	}

	/**
	 * Loads the app breadcrumbs.
	 * @returns An instance of the breadcrums of the app.
	 */
	public static async init(): Promise<Breadcrumbs> {
		if (Breadcrumbs._instance !== undefined) return Breadcrumbs._instance;

		try {
			Logger.debug("Initializing breadcrumbs...");

			const breadcrumbs = new Breadcrumbs();
			Breadcrumbs._instance = breadcrumbs;
			return breadcrumbs;
		} catch (err) {
			if (err instanceof AppError) throw err;
			Logger.error(`There was an error initializating the breadcrumbs: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error initializating the breadcrumbs!");
		}
	}

	// *************************
	// *  INSTANCE PROPERTIES  *
	// *************************

	/**
	 * Breadcrumbs from the current page. Set them manually on each page.
	 */
	private _segments: BreadcrumbsSegment[] | null;
	// *********************************
	// *  INSTANCE GETTERS & SETTERS	 *
	// *********************************

	/**
	 * Breadcrumbs from the current page. Set them manually on each page.
	 */
	public get segments(): BreadcrumbsSegment[] | null {
		return this._segments;
	}

	/**
	 * Breadcrumbs from the current page. Set them manually on each page.
	 * This will set the loading state to false.
	 */
	public set segments(segments: BreadcrumbsSegment[] | null) {
		this._segments = segments;
	}

	// ********************
	// *  STATIC METHODS  *
	// ********************

	// **********************
	// *  INSTANCE METHODS	*
	// **********************
}
