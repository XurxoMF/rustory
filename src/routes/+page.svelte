<script lang="ts">
  import { RUser } from "$lib/classes/RUser.svelte";

  import { rMainWindow } from "$lib/stores/rustory.svelte";

  import ButtonNeutral from "$lib/ui/form/Buttons/ButtonNeutral.svelte";
  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  rMainWindow.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <p>¡Hola Mundo!</p>

  <ButtonNeutral
    onclick={async () => {
      RUser.startLoginWithDiscord();
    }}
  >
    Test thigns
  </ButtonNeutral>
</PageWrapper>
