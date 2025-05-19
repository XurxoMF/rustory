<script lang="ts">
  import { appName, appVersion } from "$lib/stores/AppStore.svelte";
  import Breadcrumbs from "$lib/ui/display/Breadcrumbs.svelte";
  import WindowControls from "../display/WindowControls.svelte";
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
        alt={`${appName} · ${appVersion.value}`}
        class="w-5"
      />
      <p data-tauri-drag-region class="text-sm">
        {`${appName} · ${appVersion.value}`}
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
