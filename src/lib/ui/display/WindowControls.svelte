<script lang="ts">
  import i18n from "$i18n";
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { appMaximized, toggleAppMaximized } from "$lib/stores/AppStore.svelte";

  import { ButtonTransparent } from "$lib/ui/form/Button";
  import Icon from "$lib/ui/base/Icon.svelte";

  const appWindow = getCurrentWindow();
</script>

<ButtonTransparent
  rounded="circle"
  onclick={() => appWindow.minimize()}
  title={$i18n.t("common.Minimize")}
>
  <Icon icon="material-symbols:minimize-rounded" />
</ButtonTransparent>
<ButtonTransparent
  rounded="circle"
  onclick={() => {
    appWindow.toggleMaximize();
    toggleAppMaximized();
  }}
  title={appMaximized.value ? $i18n.t("common.Minimize") : $i18n.t("common.Maximize")}
>
  <Icon
    icon={appMaximized.value
      ? "material-symbols:collapse-content-rounded"
      : "material-symbols:expand-content-rounded"}
  />
</ButtonTransparent>
<ButtonTransparent rounded="circle" onclick={() => appWindow.hide()} title={$i18n.t("common.Hide")}>
  <Icon icon="material-symbols:visibility-off-outline-rounded" />
</ButtonTransparent>
<ButtonTransparent
  rounded="circle"
  onclick={() => appWindow.close()}
  title={$i18n.t("common.Close")}
>
  <Icon icon="material-symbols:close-rounded" />
</ButtonTransparent>
