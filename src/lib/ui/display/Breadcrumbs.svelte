<script lang="ts" module>
  type BreadcrumbsSegmentType = {
    label: string;
    href: string;
  };

  type BreadcrumbsType = {
    value: BreadcrumbsSegmentType[];
  };

  const ROOT_BREADCRUMB_SEGMENT: BreadcrumbsSegmentType = { label: "/", href: "/" };

  export const breadcrumbs: BreadcrumbsType = $state({
    value: [ROOT_BREADCRUMB_SEGMENT],
  });

  /**
   * The root breadcrumb segment will always be added to you MUST not add it
   *
   * @param newBreadcrumbs - The new breadcrumbs to set
   */
  export const setBreadcrumbs = (newBreadcrumbs: BreadcrumbsSegmentType[]): void => {
    breadcrumbs.value = [ROOT_BREADCRUMB_SEGMENT, ...newBreadcrumbs];
  };
</script>

<script lang="ts">
  import { goto } from "$app/navigation";

  import { ButtonTransparent } from "$lib/ui/form/Button";
</script>

<div class="w-fit flex items-center justify-center flex-nowrap whitespace-nowrap">
  {#each breadcrumbs.value as segment, index}
    {#if index > 1}
      <span class="px-1">/</span>
    {/if}
    <ButtonTransparent onclick={() => goto(segment.href)}>
      {segment.label}
    </ButtonTransparent>
  {/each}
</div>
