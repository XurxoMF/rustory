<script lang="ts">
  import { breadcrumbs } from "$modules/layout/stores/Breadcrumbs";

  breadcrumbs.subscribe((v) => console.log("Breadcrumbs en componente:", v));
</script>

<div class="w-fit flex items-center justify-center flex-nowrap whitespace-nowrap">
  {#each $breadcrumbs as segment}
    <a
      class="opacity-50 rounded-sm duration-200 hover:opacity-100 hover:bg-zinc-850 px-1"
      href={segment.href}
    >
      {segment.label}
    </a>
  {/each}
</div>
