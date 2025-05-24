<script lang="ts">
  import { rustory } from "$lib/stores/rustory";

  import Breadcrumbs from "$lib/ui/display/Breadcrumbs.svelte";
  import HistoryControlls from "../display/HistoryControls.svelte";
  import WindowControls from "../display/WindowControls.svelte";
  import RustoryIcon from "../RustoryIcon.svelte";
</script>

<div
  data-tauri-drag-region
  class={[
    "shrink-0 w-full flex items-center justify-between gap-6 p-2 text-sm border-b transition-[border] duration-200",
    "t-dark:border-b-zinc-800",
    "t-light:border-b-zinc-300",
    "t-rust:border-b-rust-800",
    "t-midnight:border-b-gray-800",
  ]}
>
  <div data-tauri-drag-region class="flex-1 flex items-center justify-start gap-6">
    <div data-tauri-drag-region class="w-fit flex items-center gap-2">
      <RustoryIcon class="text-xl" />

      <div class="w-fit flex items-center justify-center flex-nowrap opacity-50">
        <HistoryControlls />

        <Breadcrumbs />
      </div>
    </div>
  </div>

  <div data-tauri-drag-region class="flex-1 flex items-center justify-center gap-6">
    <div data-tauri-drag-region class="w-fit flex items-center gap-2">
      <div class="w-fit flex items-center justify-center gap-1 flex-nowrap opacity-50">
        <p data-tauri-drag-region>
          {`${rustory.mainWindow.title} ${rustory.info.version}`}
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
