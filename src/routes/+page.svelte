<script lang="ts">
  import { rMainWindow, rUser } from "$lib/stores/rustory.svelte";

  import ButtonNeutral from "$lib/ui/form/Buttons/ButtonNeutral.svelte";
  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  rMainWindow.breadcrumbs.segments = [];

  let taskId: string = "";
</script>

<PageWrapper scrollable={false}>
  <p>{rUser.accessToken ?? "No access token"}</p>
  <p>{rUser.refreshToken ?? "No access token"}</p>

  <ButtonNeutral
    onclick={async () => {
      rUser.loginWithDiscord();
    }}
  >
    Log in
  </ButtonNeutral>

  <ButtonNeutral
    onclick={async () => {
      rUser.logoutFromDiscord();
    }}
  >
    Log out
  </ButtonNeutral>

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
