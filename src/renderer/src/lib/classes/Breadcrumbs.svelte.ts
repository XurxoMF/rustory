export class Breadcrumbs {
  /**
   * Breadcrumbs from the current page. Set them manually on each page.
   */
  segments: Breadcrumbs.BreadcrumbsSegmentType[] = $state([])
}

export namespace Breadcrumbs {
  export type BreadcrumbsSegmentType = {
    label: string
    href: string
  }
}
