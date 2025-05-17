<script lang="ts">
  import { breadcrumbs } from "$modules/layout/stores/BreadcrumbsStore.svelte";
</script>

<div class="w-fit flex items-center justify-center flex-nowrap whitespace-nowrap">
  {#each breadcrumbs.value as segment, index}
    {#if index > 1}
      <span class="opacity-50 px-1">/</span>
    {/if}
    <a
      class="opacity-50 px-1 rounded-sm duration-200 hover:opacity-100 hover:bg-zinc-850"
      href={segment.href}
    >
      {segment.label}
    </a>
  {/each}
</div>
