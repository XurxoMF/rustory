import { writable } from "svelte/store";

type BreadcrumbSegmentType = {
  label: string;
  href: string;
};

export const breadcrumbs = writable<BreadcrumbSegmentType[]>([
  {
    label: "/",
    href: "/",
  },
]);
