<script lang="ts">
  import { rustory } from "$lib/stores/rustory.svelte";

  import ButtonNeutral from "$lib/ui/form/Buttons/ButtonNeutral.svelte";
  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";

  rustory.window.breadcrumbs.segments = [];

  let taskId: string = "";
</script>

<PageWrapper scrollable={false}>
  <p>{rustory.user.accessToken ?? "No access token"}</p>
  <p>{rustory.user.refreshToken ?? "No access token"}</p>

  <ButtonNeutral
    onclick={async () => {
      rustory.user.loginWithDiscord();
    }}
  >
    Log in
  </ButtonNeutral>

  <ButtonNeutral
    onclick={async () => {
      rustory.user.logoutFromDiscord();
    }}
  >
    Log out
  </ButtonNeutral>

  <ButtonNeutral
    onclick={async () => {
      taskId = rustory.window.preventClose.addTask("Test");
    }}
  >
    Add task
  </ButtonNeutral>

  <ButtonNeutral
    onclick={async () => {
      rustory.window.preventClose.removeTask(taskId);
    }}
  >
    Remove task
  </ButtonNeutral>
</PageWrapper>
