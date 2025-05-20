<script lang="ts">
  import { appName, appVersion } from "$lib/stores/AppStore.svelte";
  import Breadcrumbs from "$lib/ui/display/Breadcrumbs.svelte";
  import HistoryControlls from "../display/HistoryControls.svelte";
  import WindowControls from "../display/WindowControls.svelte";
  import RustoryIcon from "../RustoryIcon.svelte";
</script>

<div
  data-tauri-drag-region
  class="shrink-0 w-full flex items-center justify-between gap-6 p-2 text-sm"
>
  <div data-tauri-drag-region class="flex-1 flex items-center justify-start gap-6">
    <div data-tauri-drag-region class="w-fit flex items-center gap-2">
      <div class="w-fit flex items-center justify-center gap-1 flex-nowrap">
        <RustoryIcon class="text-xl" />
      </div>

      <div class="w-fit flex items-center justify-center gap-1 flex-nowrap opacity-50">
        <HistoryControlls />
      </div>

      <div class="w-fit flex items-center justify-center flex-nowrap opacity-50">
        <Breadcrumbs />
      </div>
    </div>
  </div>

  <div data-tauri-drag-region class="flex-1 flex items-center justify-center gap-6">
    <div data-tauri-drag-region class="w-fit flex items-center gap-2">
      <div class="w-fit flex items-center justify-center gap-1 flex-nowrap opacity-50">
        <p data-tauri-drag-region>
          {`${appName} ${appVersion.value}`}
        </p>
      </div>
    </div>
  </div>

  <div data-tauri-drag-region class="flex-1 flex items-center justify-end gap-6">
    <div data-tauri-drag-region class="w-fit flex items-center gap-2">
      <div class="w-fit flex items-center justify-center gap-1 flex-nowrap opacity-50">
        <WindowControls />
      </div>
    </div>
  </div>
</div>
