<script lang="ts">
  import { goto } from "$app/navigation";

  import { breadcrumbs } from "$modules/basics/stores/BreadcrumbsStore.svelte";

  import Button from "$modules/basics/components/Button.svelte";
</script>

<div class="w-fit flex items-center justify-center flex-nowrap whitespace-nowrap">
  {#each breadcrumbs.value as segment, index}
    {#if index > 1}
      <span class="px-1">/</span>
    {/if}
    <Button action={() => goto(segment.href)}>
      {segment.label}
    </Button>
  {/each}
</div>
