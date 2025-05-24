<script lang="ts">
  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import Select from "$lib/ui/form/Select.svelte";

  rustory.mainWindow.breadcrumbs.segments = [];

  const items = [
    { value: "1", label: "Paco" },
    { value: "2", label: "Jose" },
    { value: "3", label: "Pedro" },
  ];

  let user: string | undefined = $state();
</script>

<PageWrapper scrollable={false}>
  <div class="w-full h-full p-2">
    <p>¡Hola Mundo!</p>

    <Select placeholder="Hola" {items} bind:value={user} />
  </div>
</PageWrapper>
