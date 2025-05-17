<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { app } from "@tauri-apps/api";
  import { onMount } from "svelte";
  import i18n from "$i18n";

  import Icon from "$modules/basics/components/Icon.svelte";
  import Breadcrumbs from "$modules/layout/components/Breadcrumbs.svelte";

  let { maximized = $bindable() }: { maximized: boolean } = $props();

  const appWindow = getCurrentWindow();
  const appName = "Rustory";
  let appVersion = $state("X.X.X");

  onMount(async () => (appVersion = await app.getVersion()));
</script>

<div
  data-tauri-drag-region
  class="shrink-0 w-full flex items-center justify-between gap-6 px-2 py-1"
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
        alt={`${appName} · ${appVersion}`}
        class="w-5"
      />
      <p data-tauri-drag-region class="opacity-50 text-sm">
        {`${appName} · ${appVersion}`}
      </p>
    </div>
  </div>

  <div data-tauri-drag-region class="w-1/3 flex items-center justify-end gap-6">
    <div data-tauri-drag-region class="shrink-0 w-fit flex items-center justify-end gap-2 text-xl">
      <div class="w-fit flex items-center justify-center flex-nowrap">
        {@render ActionButton({
          title: $i18n.t("common.Minimize"),
          icon: "ph:caret-line-down-duotone",
          action: () => appWindow.minimize(),
        })}
        {@render ActionButton({
          title: maximized ? $i18n.t("common.Minimize") : $i18n.t("common.Maximize"),
          icon: maximized ? "ph:exclude-square-duotone" : "ph:square-duotone",
          action: async () => {
            appWindow.toggleMaximize();
            maximized = !maximized;
          },
        })}
        {@render ActionButton({
          title: $i18n.t("common.Hide"),
          icon: "ph:eye-slash-duotone",
          action: () => appWindow.hide(),
        })}
        {@render ActionButton({
          title: $i18n.t("common.Close"),
          icon: "ph:x-circle-duotone",
          action: () => appWindow.close(),
        })}
      </div>
    </div>
  </div>
</div>

{#snippet ActionButton({
  title,
  icon,
  action,
}: {
  title: string;
  icon: string;
  action: () => void;
})}
  <button
    onclick={action}
    {title}
    class="cursor-pointer opacity-50 rounded-full duration-200 hover:opacity-100 hover:bg-zinc-850 p-1"
  >
    <Icon {icon} />
  </button>
{/snippet}
