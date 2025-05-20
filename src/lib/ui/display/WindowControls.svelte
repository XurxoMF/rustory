<script lang="ts">
  import i18n from "$i18n";
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { rustory } from "$lib/stores/rustory";

  import { ButtonTransparent } from "$lib/ui/form/Button";
  import Icon from "$lib/ui/base/Icon.svelte";

  const appWindow = getCurrentWindow();
</script>

<ButtonTransparent
  rounded="circle"
  onclick={() => appWindow.minimize()}
  title={$i18n.t("common.Minimize")}
>
  <Icon icon="ph:minus-bold" />
</ButtonTransparent>
<ButtonTransparent
  rounded="circle"
  onclick={() => {
    appWindow.toggleMaximize();
    rustory.mainWindow.isMaximized = !rustory.mainWindow.isMaximized;
  }}
  title={rustory.mainWindow.isMaximized ? $i18n.t("common.Minimize") : $i18n.t("common.Maximize")}
>
  <Icon
    icon={rustory.mainWindow.isMaximized ? "ph:arrows-in-simple-bold" : "ph:arrows-out-simple-bold"}
  />
</ButtonTransparent>
<ButtonTransparent rounded="circle" onclick={() => appWindow.hide()} title={$i18n.t("common.Hide")}>
  <Icon icon="ph:eye-slash-bold" />
</ButtonTransparent>
<ButtonTransparent
  rounded="circle"
  onclick={() => appWindow.close()}
  title={$i18n.t("common.Close")}
>
  <Icon icon="ph:x-bold" />
</ButtonTransparent>
