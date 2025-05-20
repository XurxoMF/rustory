<script lang="ts">
  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  rustory.mainWindow.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <div class="w-full h-full p-2">
    <p>Hola Mundo!</p>
  </div>
</PageWrapper>
