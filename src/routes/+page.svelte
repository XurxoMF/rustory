<script lang="ts">
  import { rMainWindow } from "$lib/stores/rustory.svelte";

  import ButtonNeutral from "$lib/ui/form/Buttons/ButtonNeutral.svelte";
  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  rMainWindow.breadcrumbs.segments = [];

  let taskId: string = "";
</script>

<PageWrapper scrollable={false}>
  <ButtonNeutral
    onclick={async () => {
      taskId = rMainWindow.preventClose.addTask("Test");
    }}
  >
    Add task
  </ButtonNeutral>

  <ButtonNeutral
    onclick={async () => {
      rMainWindow.preventClose.removeTask(taskId);
    }}
  >
    Remove task
  </ButtonNeutral>
</PageWrapper>
