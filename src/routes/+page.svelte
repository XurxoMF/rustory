<script lang="ts">
  import { RustoryUser } from "$lib/classes/RustoryUser.svelte";
  import { rustory } from "$lib/stores/rustory";
  import ButtonNeutral from "$lib/ui/form/Buttons/ButtonNeutral.svelte";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  rustory.mainWindow.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <p>¡Hola Mundo!</p>

  <ButtonNeutral
    onclick={async () => {
      RustoryUser.startLoginWithDiscord();
    }}
  >
    Test thigns
  </ButtonNeutral>
</PageWrapper>
