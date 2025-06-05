<script lang="ts">
  import { Window } from "$lib/classes/Rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  Window.instance.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <div class="flex gap-2 flex-wrap"></div>
</PageWrapper>
