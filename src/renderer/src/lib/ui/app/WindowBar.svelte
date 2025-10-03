<script lang="ts">
  import Breadcrumbs from '@renderer/lib/ui/display/Breadcrumbs.svelte'
  import HistoryControlls from '@renderer/lib/ui/display/HistoryControls.svelte'
  import WindowControls from '@renderer/lib/ui/display/WindowControls.svelte'
  import RustoryIcon from '@renderer/lib/ui/RustoryIcon.svelte'
  import Command, { openCommand } from '@renderer/lib/ui/app/Command.svelte'
  import Keys from '../form/Keys.svelte'
  import { m } from '@renderer/paraglide/messages'
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
  <div class="shrink-0 flex items-center justify-start gap-6">
    <div class="w-fit flex items-center gap-2">
      <RustoryIcon class="text-xl" />

      <div class="app-no-drag w-fit flex items-center justify-center flex-nowrap opacity-50">
        <HistoryControlls />

        <Breadcrumbs />
      </div>
    </div>
  </div>

  <div class="w-full flex items-center justify-center gap-6">
    <div class="app-no-drag w-1/2">
      <button
        class={[
          'relative w-full h-7 flex items-center justify-center shrink-0 opacity-50 rounded-md border transition-[opacity,border,background-color] duration-200',
          'focus:outline-1',
          'cursor-pointer disabled:cursor-not-allowed',
          'disabled:opacity-50',
          't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
          't-light:bg-zinc-200 t-light:border-zinc-250 t-light:focus:outline-zinc-250',
          't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus:outline-rust-750',
          't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus:outline-gray-750'
        ]}
        onclick={() => openCommand()}
      >
        {m.placeholders__search_or_use_a_command()}

        <span class="absolute top-1/2 right-2 -translate-y-1/2">
          <Keys keys={['ctrl', 'k']} />
        </span>
      </button>
    </div>

    <Command />
  </div>

  <div class="shrink-0 flex items-center justify-end gap-6">
    <div class="w-fit flex items-center gap-2">
      <div class="app-no-drag w-fit flex items-center justify-center gap-1 flex-nowrap opacity-50">
        <WindowControls />
      </div>
    </div>
  </div>
</div>
