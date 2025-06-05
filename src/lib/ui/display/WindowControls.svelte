<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { m } from "$lib/paraglide/messages";

  import { Window } from "$lib/classes/Rustory";

  import { ButtonUnstyled } from "$lib/ui/form/Buttons";
  import Icon from "$lib/ui/base/Icon.svelte";

  const appWindow = getCurrentWindow();
</script>

<ButtonUnstyled icon onclick={() => appWindow.minimize()} title={m.common__minimize()}>
  <Icon icon="ph:minus-bold" />
</ButtonUnstyled>

<ButtonUnstyled
  icon
  onclick={() => {
    appWindow.toggleMaximize();
    Window.instance.isMaximized = !Window.instance.isMaximized;
  }}
  title={Window.instance.isMaximized ? m.common__minimize() : m.common_maximize()}
>
  <Icon
    icon={Window.instance.isMaximized ? "ph:arrows-in-simple-bold" : "ph:arrows-out-simple-bold"}
  />
</ButtonUnstyled>

<ButtonUnstyled icon onclick={() => appWindow.hide()} title={m.common__hide()}>
  <Icon icon="ph:eye-slash-bold" />
</ButtonUnstyled>

<ButtonUnstyled
  icon
  onclick={() => {
    // TODO: If the close is prevented show a notification.
    if (!Window.instance.preventClose.prevented) return appWindow.close();
  }}
  title={m.common__close()}
>
  <Icon icon="ph:x-bold" />
</ButtonUnstyled>
