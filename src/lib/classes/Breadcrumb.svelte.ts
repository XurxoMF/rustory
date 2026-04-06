/**
 * Each breadcrumb segment. It's the same as the path segments.
 *
 * @example
 * Path: /foo/bar
 * Segments: [{ label: 'foo', href: '/foo' }, { label: 'bar', href: '/foo/bar' }]
 */
export type BreadcrumbSegment = {
	label: string;
	href: string;
};

/**
 * Breadcrums store.
 */
export class Breadcrumb {
	/**
	 * Singleton instance of the Breadcrumb.
	 */
	private static _instance: Breadcrumb = new Breadcrumb();

	/**
	 * Get the instance of the Breadcrumb.
	 */
	public static get instance(): Breadcrumb {
		return Breadcrumb._instance;
	}

	/**
	 * Breadcrumb from the current page. Set them manually on each page.
	 */
	private _segments: BreadcrumbSegment[] = $state([]);

	private constructor() {}

	/**
	 * Breadcrumb from the current page. Set them manually on each page.
	 */
	public get segments(): BreadcrumbSegment[] {
		return this._segments;
	}

	/**
	 * Breadcrumb from the current page. Set them manually on each page.
	 */
	public set segments(segments: BreadcrumbSegment[]) {
		this._segments = segments;
	}
}
