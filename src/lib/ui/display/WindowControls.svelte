<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { m } from "$lib/paraglide/messages";

  import { rMainWindow } from "$lib/stores/rustory.svelte";

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
    rMainWindow.isMaximized = !rMainWindow.isMaximized;
  }}
  title={rMainWindow.isMaximized ? m.common__minimize() : m.common_maximize()}
>
  <Icon icon={rMainWindow.isMaximized ? "ph:arrows-in-simple-bold" : "ph:arrows-out-simple-bold"} />
</ButtonUnstyled>
<ButtonUnstyled icon onclick={() => appWindow.hide()} title={m.common__hide()}>
  <Icon icon="ph:eye-slash-bold" />
</ButtonUnstyled>
<ButtonUnstyled icon onclick={() => appWindow.close()} title={m.common__close()}>
  <Icon icon="ph:x-bold" />
</ButtonUnstyled>
