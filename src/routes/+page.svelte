<script lang="ts">
  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  rustory.mainWindow.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <p>¡Hola Mundo!</p>

  <button onclick={() => rustory.log("info", "Hola")}> Log </button>
</PageWrapper>
