<script lang="ts">
  import { rustory } from "$lib/stores/rustory.svelte";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  rustory.window.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <div class="flex gap-2 flex-wrap"></div>
</PageWrapper>
