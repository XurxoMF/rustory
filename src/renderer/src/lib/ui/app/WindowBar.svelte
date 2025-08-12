<script lang="ts">
  import { Info } from '@renderer/lib/classes/Rustory'

  import Breadcrumbs from '@renderer/lib/ui/display/Breadcrumbs.svelte'
  import HistoryControlls from '@renderer/lib/ui/display/HistoryControls.svelte'
  import WindowControls from '@renderer/lib/ui/display/WindowControls.svelte'
  import RustoryIcon from '@renderer/lib/ui/RustoryIcon.svelte'
</script>

<div
  class={[
    'app-drag shrink-0 w-full h-10 flex items-center justify-between gap-6 p-2 text-sm border-b transition-[border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-b-zinc-750',
    't-light:bg-zinc-150 t-light:border-b-zinc-250',
    't-rust:bg-rust-850 t-rust:border-b-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-b-gray-750'
  ]}
>
  <div class="flex-1 flex items-center justify-start gap-6">
    <div class="w-fit flex items-center gap-2">
      <RustoryIcon class="text-xl" />

      <div class="app-no-drag w-fit flex items-center justify-center flex-nowrap opacity-50">
        <HistoryControlls />

        <Breadcrumbs />
      </div>
    </div>
  </div>

  <div class="flex-1 flex items-center justify-center gap-6">
    <div class="w-fit flex items-center gap-2">
      <div class="w-fit flex items-center justify-center gap-1 flex-nowrap opacity-50">
        <p>
          {`${Info.instance.productName} ${Info.instance.version}`}
        </p>
      </div>
    </div>
  </div>

  <div class="flex-1 flex items-center justify-end gap-6">
    <div class="w-fit flex items-center gap-2">
      <div class="app-no-drag w-fit flex items-center justify-center gap-1 flex-nowrap opacity-50">
        <WindowControls />
      </div>
    </div>
  </div>
</div>
