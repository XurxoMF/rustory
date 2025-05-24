<script lang="ts">
  import { rustory } from "$lib/stores/rustory";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import Select from "$lib/ui/form/Select.svelte";

  rustory.mainWindow.breadcrumbs.segments = [];

  const items = [
    { value: "1", label: "Paco" },
    { value: "2", label: "Jose" },
    { value: "3", label: "Pedro" },
    { value: "4", label: "Paco" },
    { value: "5", label: "Jose" },
    { value: "6", label: "Pedro" },
    { value: "7", label: "Paco" },
    { value: "8", label: "Jose" },
    { value: "9", label: "Pedro" },
    { value: "10", label: "Paco" },
    { value: "11", label: "Jose" },
    { value: "12", label: "Pedro" },
  ];

  let user: string | undefined = $state();
</script>

<PageWrapper scrollable={false}>
  <div class="w-full h-full p-2 bg-zinc-900">
    <p>¡Hola Mundo!</p>

    <div class="w-60">
      <Select placeholder="Hola" {items} bind:value={user} variant="base" />
    </div>
  </div>
</PageWrapper>
