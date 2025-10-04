<script lang="ts">
  import { m } from '@renderer/paraglide/messages'

  import Breadcrumbs from '@renderer/lib/ui/display/Breadcrumbs.svelte'
  import HistoryControlls from '@renderer/lib/ui/display/HistoryControls.svelte'
  import WindowControls from '@renderer/lib/ui/display/WindowControls.svelte'
  import RustoryIcon from '@renderer/lib/ui/RustoryIcon.svelte'
  import { openCommand } from '@renderer/lib/ui/app/Command.svelte'
  import Keys from '@renderer/lib/ui/form/Keys.svelte'
</script>

<div
  class={[
    'app-drag relative shrink-0 w-full h-10 flex items-center justify-between gap-6 p-2 text-sm border-b transition-[border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-b-zinc-750',
    't-light:bg-zinc-100 t-light:border-b-zinc-300',
    't-rust:bg-rust-850 t-rust:border-b-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-b-gray-750'
  ]}
>
  <div class="shrink-0 flex-1 flex items-center justify-start gap-6">
    <div class="w-fit flex items-center gap-2">
      <RustoryIcon class="text-xl" />

      <div class="app-no-drag w-fit flex items-center justify-center flex-nowrap opacity-40">
        <HistoryControlls />

        <Breadcrumbs />
      </div>
    </div>
  </div>

  <div class="app-no-drag absolute w-1/3 left-1/2 -translate-x-1/2">
    <button
      class={[
        'relative w-full h-7 flex items-center justify-center shrink-0 rounded-md border transition-[opacity,border,background-color] duration-200',
        'focus-visible:outline-1',
        'cursor-pointer disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
        't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
        't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
        't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750'
      ]}
      onclick={() => openCommand()}
    >
      {m.placeholders__search_or_use_a_command()}

      <span class="absolute top-1/2 right-2 -translate-y-1/2">
        <Keys keys={['ctrl', 'k']} />
      </span>
    </button>
  </div>

  <div class="shrink-0 flex-1 flex items-center justify-end gap-6">
    <div class="w-fit flex items-center gap-2">
      <div class="app-no-drag w-fit flex items-center justify-center gap-1 flex-nowrap opacity-40">
        <WindowControls />
      </div>
    </div>
  </div>
</div>
