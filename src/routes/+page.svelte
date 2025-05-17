<script lang="ts">
  import { setBreadcrumbs } from "$modules/basics/stores/BreadcrumbsStore.svelte";
  setBreadcrumbs([]);

  import ThemeSelector from "$modules/basics/components/ThemeSelector.svelte";
</script>

<p>Hola Mundo!</p>

<ThemeSelector />
