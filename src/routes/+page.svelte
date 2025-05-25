<script lang="ts">
  import { core } from "@tauri-apps/api";

  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import { appDataDir, cacheDir, join, localDataDir } from "@tauri-apps/api/path";
  import { onMount } from "svelte";

  rustory.mainWindow.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <p>¡Hola Mundo!</p>

  <button
    onclick={() => {
      rustory.notify("Título", "Contido");
    }}
  >
    notificación
  </button>
</PageWrapper>
