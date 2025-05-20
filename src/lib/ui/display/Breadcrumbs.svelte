<script lang="ts" module>
  type BreadcrumbsSegmentType = {
    label: string;
    href: string;
  };

  type BreadcrumbsType = {
    value: BreadcrumbsSegmentType[];
  };

  export const breadcrumbs: BreadcrumbsType = $state({
    value: [],
  });

  /**
   * The root breadcrumb segment will always be added to you MUST not add it
   *
   * @param newBreadcrumbs - The new breadcrumbs to set
   */
  export const setBreadcrumbs = (newBreadcrumbs: BreadcrumbsSegmentType[]): void => {
    breadcrumbs.value = [...newBreadcrumbs];
  };
</script>

<script lang="ts">
  import { goto } from "$app/navigation";

  import { ButtonTransparent } from "$lib/ui/form/Button";
  import Icon from "$lib/ui/base/Icon.svelte";
  import { fly } from "svelte/transition";
</script>

<ButtonTransparent onclick={() => goto("/")}>
  <Icon icon="ph:house" />
</ButtonTransparent>
{#each breadcrumbs.value as segment, index}
  <span
    in:fly={{ duration: 200, opacity: 0, x: -5 }}
    out:fly={{ duration: 200, opacity: 0, x: -5 }}
  >
    <Icon icon="material-symbols:chevron-right-rounded" />
  </span>

  <span
    in:fly={{ duration: 200, opacity: 0, x: -5 }}
    out:fly={{ duration: 200, opacity: 0, x: -5 }}
    class="text-[.72em]"
  >
    <ButtonTransparent onclick={() => goto(segment.href)}>
      {segment.label}
    </ButtonTransparent>
  </span>
{/each}
