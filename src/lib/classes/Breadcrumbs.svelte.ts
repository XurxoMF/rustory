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
	/**
	 * Singleton instance of the Breadcrumb.
	 */
	private static _instance: Breadcrumbs = new Breadcrumbs();

	/**
	 * Get the instance of the Breadcrumb.
	 */
	public static get instance(): Breadcrumbs {
		return Breadcrumbs._instance;
	}

	/**
	 * Breadcrumb from the current page. Set them manually on each page.
	 */
	private _segments: BreadcrumbsSegment[] = $state([]);

	private constructor() {}

	/**
	 * Breadcrumb from the current page. Set them manually on each page.
	 */
	public get segments(): BreadcrumbsSegment[] {
		return this._segments;
	}

	/**
	 * Breadcrumb from the current page. Set them manually on each page.
	 */
	public set segments(segments: BreadcrumbsSegment[]) {
		this._segments = segments;
	}
}
