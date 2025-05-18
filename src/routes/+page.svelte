<script lang="ts">
  import ThemeSelector from "$lib/components/settings/Theme.svelte";
  import Collapsible from "$lib/components/ui/Collapsible.svelte";
  import { setBreadcrumbs } from "$lib/components/layout/Breadcrumbs.svelte";

  setBreadcrumbs([]);
</script>

<p>Hola Mundo!</p>

<ThemeSelector />

<Collapsible title="Título">
  <p>Hola Mundo!</p>
</Collapsible>
