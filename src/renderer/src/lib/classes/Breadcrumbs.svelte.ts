export class Breadcrumbs {
  /**
   * Singleton instance of the Breadcrumbs.
   */
  private static _instance: Breadcrumbs | null = null

  /**
   * Get the instance of the Breadcrumbs.
   */
  static get instance(): Breadcrumbs {
    if (Breadcrumbs._instance === null) Breadcrumbs._instance = new Breadcrumbs()
    return Breadcrumbs._instance
  }

  /**
   * Breadcrumbs from the current page. Set them manually on each page.
   */
  segments: Breadcrumbs.BreadcrumbsSegmentType[] = $state([])

  private constructor() {}
}

export namespace Breadcrumbs {
  export type BreadcrumbsSegmentType = {
    label: string
    href: string
  }
}
