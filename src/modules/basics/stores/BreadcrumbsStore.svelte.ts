type BreadcrumbStoreSegmentType = {
  label: string;
  href: string;
};

type BreadcrumbsStoreType = {
  value: BreadcrumbStoreSegmentType[];
};

const ROOT_BREADCRUMB_SEGMENT: BreadcrumbStoreSegmentType = { label: "/", href: "/" };

export const breadcrumbs = $state<BreadcrumbsStoreType>({
  value: [ROOT_BREADCRUMB_SEGMENT],
});

/**
 * The root breadcrumb segment will always be added to you MUST not add it
 *
 * @param newBreadcrumbs - The new breadcrumbs to set
 */
export const setBreadcrumbs = (newBreadcrumbs: BreadcrumbStoreSegmentType[]): void => {
  breadcrumbs.value = [ROOT_BREADCRUMB_SEGMENT, ...newBreadcrumbs];
};
