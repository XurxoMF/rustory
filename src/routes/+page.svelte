<script lang="ts">
  import ThemeSelector from "$lib/ui/settings/Theme.svelte";
  import {
    CollapsibleRoot,
    CollapsibleContent,
    CollapsibleToggler,
  } from "$lib/ui/base/Collapsible";
  import { setBreadcrumbs } from "$lib/ui/display/Breadcrumbs.svelte";

  setBreadcrumbs([]);
</script>

<p>Hola Mundo!</p>

<CollapsibleRoot class="w-full bg-red-700/10 p-1">
  {#snippet collapsible(collapsible)}
    <CollapsibleToggler toggle={collapsible.toggle} class="w-full bg-yellow-500/10 p-1">
      <p>Theme Selector</p>
    </CollapsibleToggler>

    <CollapsibleContent open={collapsible.open} class="w-1/2 bg-green-700/10 p-1">
      <ThemeSelector />
      <button onclick={collapsible.toggle}> Close </button>
    </CollapsibleContent>
  {/snippet}
</CollapsibleRoot>
