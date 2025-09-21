/**
 * Breadcrums store.
 */
export class Breadcrumbs {
  /**
   * Singleton instance of the Breadcrumbs.
   */
  private static _instance: Breadcrumbs = new Breadcrumbs()

  /**
   * Get the instance of the Breadcrumbs.
   */
  public static get instance(): Breadcrumbs {
    return Breadcrumbs._instance
  }

  /**
   * Breadcrumbs from the current page. Set them manually on each page.
   */
  private _segments: Breadcrumbs.Segment[] = $state([])

  private constructor() {}

  /**
   * Breadcrumbs from the current page. Set them manually on each page.
   */
  public get segments(): Breadcrumbs.Segment[] {
    return this._segments
  }

  /**
   * Breadcrumbs from the current page. Set them manually on each page.
   */
  public set segments(segments: Breadcrumbs.Segment[]) {
    this._segments = segments
  }
}

export namespace Breadcrumbs {
  /**
   * Each breadcrumb segment. It's the same as the path segments.
   *
   * @example
   * Path: /foo/bar
   * Segments: [{ label: 'foo', href: '/foo' }, { label: 'bar', href: '/foo/bar' }]
   */
  export type Segment = {
    label: string
    href: string
  }
}
