<script lang="ts">
  import { RUser } from "$lib/classes/RUser.svelte";
  import { commands } from "$lib/ipc";

  import { rMainWindow } from "$lib/stores/rustory.svelte";

  import ButtonNeutral from "$lib/ui/form/Buttons/ButtonNeutral.svelte";
  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import { onMount } from "svelte";

  rMainWindow.breadcrumbs.segments = [];

  let greet = $state("");

  onMount(() => {
    (async () => {
      greet = await commands.greet("Hola Mundo!");
    })();
  });
</script>

<PageWrapper scrollable={false}>
  <p>{greet}</p>

  <ButtonNeutral
    onclick={async () => {
      RUser.startLoginWithDiscord();
    }}
  >
    Test thigns
  </ButtonNeutral>
</PageWrapper>
