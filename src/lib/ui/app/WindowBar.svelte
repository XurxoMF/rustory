<script lang="ts">
  import Breadcrumbs from "$lib/ui/display/Breadcrumbs.svelte";
  import WindowControls from "../display/WindowControls.svelte";

  const APP_NAME = "Rustory";

  let { appVersion = "X.X.X" }: { appVersion: string } = $props();
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
        <WindowControls />
      </div>
    </div>
  </div>
</div>
