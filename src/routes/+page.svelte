<script lang="ts">
  import { User, Window } from "$lib/classes/Rustory";
  import ButtonNeutral from "$lib/ui/form/Buttons/ButtonNeutral.svelte";

  import PageWrapper from "$lib/ui/layout/PageWrapper.svelte";
  import { rustoryAPIFetch } from "$lib/utils/fetch";

  Window.instance.breadcrumbs.segments = [];
</script>

<PageWrapper scrollable={false}>
  <div class="flex flex-col gap-2 flex-wrap">
    <p>{User.instance.accessToken || "No access token"}</p>
    <p>{User.instance.refreshToken || "No rerfresh token"}</p>

    <p>{JSON.stringify(User.instance.data)}</p>

    <ButtonNeutral onclick={() => User.instance.loginWithDiscord()}>Login</ButtonNeutral>
  </div>
</PageWrapper>
