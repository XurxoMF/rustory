<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { m } from "$lib/paraglide/messages";

  import { rustory } from "$lib/stores/rustory";

  import { ButtonUnstyled } from "$lib/ui/form/Button";
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
    rustory.mainWindow.isMaximized = !rustory.mainWindow.isMaximized;
  }}
  title={rustory.mainWindow.isMaximized ? m.common__minimize() : m.common_maximize()}
>
  <Icon
    icon={rustory.mainWindow.isMaximized ? "ph:arrows-in-simple-bold" : "ph:arrows-out-simple-bold"}
  />
</ButtonUnstyled>
<ButtonUnstyled icon onclick={() => appWindow.hide()} title={m.common__hide()}>
  <Icon icon="ph:eye-slash-bold" />
</ButtonUnstyled>
<ButtonUnstyled icon onclick={() => appWindow.close()} title={m.common__close()}>
  <Icon icon="ph:x-bold" />
</ButtonUnstyled>
