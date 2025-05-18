<script lang="ts">
  import i18n from "$i18n";
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { maximized, toggleMaximized } from "$lib/stores/MaximizedStateStore.svelte";

  import { ButtonSuccess, ButtonDanger, ButtonNeutral, ButtonWarning } from "$lib/ui/form/Button";

  const appWindow = getCurrentWindow();
</script>

<ButtonSuccess
  rounded="circle"
  onclick={() => appWindow.minimize()}
  title={$i18n.t("common.Minimize")}
>
  <span class="w-2 h-2"></span>
</ButtonSuccess>
<ButtonWarning
  rounded="circle"
  onclick={() => {
    appWindow.toggleMaximize();
    toggleMaximized();
  }}
  title={maximized.value ? $i18n.t("common.Minimize") : $i18n.t("common.Maximize")}
>
  <span class="w-2 h-2"></span>
</ButtonWarning>
<ButtonNeutral rounded="circle" onclick={() => appWindow.hide()} title={$i18n.t("common.Hide")}>
  <span class="w-2 h-2"></span>
</ButtonNeutral>
<ButtonDanger rounded="circle" onclick={() => appWindow.close()} title={$i18n.t("common.Close")}>
  <span class="w-2 h-2"></span>
</ButtonDanger>
