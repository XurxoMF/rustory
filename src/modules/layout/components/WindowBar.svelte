<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { app } from "@tauri-apps/api";
  import { onMount } from "svelte";
  import i18n from "$i18n";

  import Icon from "$modules/basics/components/Icon.svelte";
  import Button from "$modules/basics/components/forms/Button.svelte";

  let { maximized = $bindable() }: { maximized: boolean } = $props();

  const appWindow = getCurrentWindow();
  const appName = "Rustory";
  let appVersion = $state("X.X.X");

  onMount(async () => (appVersion = await app.getVersion()));
</script>

<div class="shrink-0 w-full h-8 flex items-center justify-between gap-4 px-2">
  <div data-tauri-drag-region class="w-full flex items-center gap-2">
    <img
      data-tauri-drag-region
      src="/img/icon.png"
      alt={`${appName} · ${appVersion}`}
      class="w-5"
    />
    <span data-tauri-drag-region class="text-sm">{`${appName} · ${appVersion}`}</span>
  </div>

  <div class="flex items-center justify-end gap-2 text-xl">
    <Button onclick={() => appWindow.minimize()} title={$i18n.t("common.Minimize")}>
      <Icon icon="ph:caret-line-down-duotone" />
    </Button>
    <Button
      onclick={() => {
        appWindow.toggleMaximize();
        maximized = !maximized;
      }}
      title={maximized ? $i18n.t("common.Minimize") : $i18n.t("common.Maximize")}
    >
      <Icon icon={maximized ? "ph:exclude-square-duotone" : "ph:square-duotone"} />
    </Button>
    <Button onclick={() => appWindow.hide()} title={$i18n.t("common.Hide")}>
      <Icon icon="ph:eye-slash-duotone" />
    </Button>
    <Button onclick={() => appWindow.close()} title={$i18n.t("common.Close")}>
      <Icon icon="ph:x-circle-duotone" />
    </Button>
  </div>
</div>
