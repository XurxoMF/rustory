export class Breadcrumbs {
  /**
   * Singleton instance of the Breadcrumbs.
   */
  private static _instance: Breadcrumbs | null = null

  /**
   * Get the instance of the Breadcrumbs.
   */
  public static get instance(): Breadcrumbs {
    if (Breadcrumbs._instance === null) Breadcrumbs._instance = new Breadcrumbs()
    return Breadcrumbs._instance
  }

  /**
   * Breadcrumbs from the current page. Set them manually on each page.
   */
  private _segments: Breadcrumbs.BreadcrumbsSegmentType[] = $state([])

  private constructor() {}

  /**
   * Breadcrumbs from the current page. Set them manually on each page.
   */
  public get segments(): Breadcrumbs.BreadcrumbsSegmentType[] {
    return this._segments
  }

  /**
   * Breadcrumbs from the current page. Set them manually on each page.
   */
  public set segments(segments: Breadcrumbs.BreadcrumbsSegmentType[]) {
    this._segments = segments
  }
}

export namespace Breadcrumbs {
  export type BreadcrumbsSegmentType = {
    label: string
    href: string
  }
}
