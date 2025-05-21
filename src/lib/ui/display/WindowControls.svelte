<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { rustory } from "$lib/stores/rustory";

  import { ButtonTransparent } from "$lib/ui/form/Button";
  import Icon from "$lib/ui/base/Icon.svelte";

  const appWindow = getCurrentWindow();
</script>

<!-- TODO: paraglide -->
<ButtonTransparent rounded="circle" onclick={() => appWindow.minimize()} title={"common.Minimize"}>
  <Icon icon="ph:minus-bold" />
</ButtonTransparent>
<ButtonTransparent
  rounded="circle"
  onclick={() => {
    appWindow.toggleMaximize();
    rustory.mainWindow.isMaximized = !rustory.mainWindow.isMaximized;
  }}
  title={rustory.mainWindow.isMaximized ? "common.Minimize" : "common.Maximize"}
>
  <Icon
    icon={rustory.mainWindow.isMaximized ? "ph:arrows-in-simple-bold" : "ph:arrows-out-simple-bold"}
  />
</ButtonTransparent>
<ButtonTransparent rounded="circle" onclick={() => appWindow.hide()} title={"common.Hide"}>
  <Icon icon="ph:eye-slash-bold" />
</ButtonTransparent>
<ButtonTransparent rounded="circle" onclick={() => appWindow.close()} title={"common.Close"}>
  <Icon icon="ph:x-bold" />
</ButtonTransparent>
