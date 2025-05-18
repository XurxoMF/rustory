<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import i18n from "$i18n";

  import Breadcrumbs from "$modules/basics/components/layout/Breadcrumbs.svelte";
  import Button from "$modules/basics/components/Button.svelte";

  const APP_NAME = "Rustory";

  const appWindow = getCurrentWindow();

  let {
    maximized = $bindable(),
    appVersion = "X.X.X",
  }: { maximized: boolean; appVersion: string } = $props();
</script>

<div
  data-tauri-drag-region
  class="shrink-0 w-full h-10 flex items-center justify-between gap-6 px-2 py-1"
>
  <div data-tauri-drag-region class="w-1/3 flex items-center justify-start gap-6">
    <div data-tauri-drag-region class="w-fit flex items-center gap-2 text-sm">
      <Breadcrumbs />
    </div>
  </div>

  <div data-tauri-drag-region class="w-1/3 flex items-center justify-center gap-6">
    <div data-tauri-drag-region class="w-fit flex items-center gap-2">
      <img
        data-tauri-drag-region
        src="/img/icon.png"
        alt={`${APP_NAME} · ${appVersion}`}
        class="w-5"
      />
      <p data-tauri-drag-region class="text-sm">
        {`${APP_NAME} · ${appVersion}`}
      </p>
    </div>
  </div>

  <div data-tauri-drag-region class="w-1/3 flex items-center justify-end gap-6">
    <div data-tauri-drag-region class="w-fit flex items-center gap-2 text-xs">
      <div class="w-fit flex items-center justify-center gap-1 flex-nowrap">
        <Button
          rounded="circle"
          mode="success"
          action={() => appWindow.minimize()}
          title={$i18n.t("common.Minimize")}
        >
          <span class="w-2 h-2"></span></Button
        >
        <Button
          rounded="circle"
          mode="warning"
          action={() => {
            appWindow.toggleMaximize();
            maximized = !maximized;
          }}
          title={maximized ? $i18n.t("common.Minimize") : $i18n.t("common.Maximize")}
          ><span class="w-2 h-2"></span></Button
        >
        <Button
          rounded="circle"
          mode="neutral"
          action={() => appWindow.hide()}
          title={$i18n.t("common.Hide")}><span class="w-2 h-2"></span></Button
        >
        <Button
          rounded="circle"
          mode="danger"
          action={() => appWindow.close()}
          title={$i18n.t("common.Close")}><span class="w-2 h-2"></span></Button
        >
      </div>
    </div>
  </div>
</div>
