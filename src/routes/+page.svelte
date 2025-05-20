<script lang="ts">
  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import { setBreadcrumbs } from "$lib/ui/display/Breadcrumbs.svelte";

  setBreadcrumbs([]);
</script>

<PageWrapper scrollable={false}>
  <div class="w-full h-full p-2">
    <p>Hola Mundo!</p>
  </div>
</PageWrapper>
