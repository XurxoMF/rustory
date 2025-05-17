type BreadcrumbSegmentType = {
  label: string;
  href: string;
};

type BreadcrumbsStoreType = {
  value: BreadcrumbSegmentType[];
};

const ROOT_BREADCRUMB_SEGMENT: BreadcrumbSegmentType = { label: "/", href: "/" };

export const breadcrumbs = $state<BreadcrumbsStoreType>({
  value: [ROOT_BREADCRUMB_SEGMENT],
});

/**
 * The root breadcrumb segment will always be added to you MUST not add it
 *
 * @param newBreadcrumbs - The new breadcrumbs to set
 */
export const setBreadcrumbs = (newBreadcrumbs: BreadcrumbSegmentType[]): void => {
  breadcrumbs.value = [ROOT_BREADCRUMB_SEGMENT, ...newBreadcrumbs];
};
