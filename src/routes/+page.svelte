<script lang="ts">
  import { rustory } from "$lib/stores/rustory";
  import ButtonNeutral from "$lib/ui/form/Buttons/ButtonNeutral.svelte";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import { open } from "@tauri-apps/plugin-dialog";

  rustory.mainWindow.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <p>¡Hola Mundo!</p>

  <ButtonNeutral
    onclick={async () => {
      const file = await open({
        directory: true,
      });

      console.log("User answered:", file);
    }}
  >
    Test thigns
  </ButtonNeutral>
</PageWrapper>
