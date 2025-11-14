<script lang="ts">
  import { m } from '@renderer/paraglide/messages'
  import { goto } from '@mateothegreat/svelte5-router'

  import { Reloader } from '@renderer/lib/classes/Reloader.svelte'
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import { openCommand } from '@renderer/lib/ui/app/Command.svelte'

  import Key from '@renderer/lib/ui/components/Key.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Separator from '../components/Separator.svelte'
</script>

<div class={['app-drag shrink-0 w-full flex items-center justify-between gap-2 border-b transition-all duration-100', 't-dark:text-zinc-200/50 t-dark:border-b-zinc-800']}>
  <div class="flex-1 h-full flex items-center justify-start">
    <div class="app-no-drag flex items-center justify-center p-1">
      <Button onclick={() => history.back()} title={m.common__previous()}>
        <Icon icon="ph:caret-left-bold" />
      </Button>

      <Button onclick={() => history.forward()} title={m.common__next()}>
        <Icon icon="ph:caret-right-bold" />
      </Button>

      <Button onclick={() => Reloader.instance.executeTasks()} title={m.common__reload()}>
        <Icon icon="ph:arrow-clockwise-bold" />
      </Button>
    </div>

    <Separator orientation="vertical" />

    <div class="app-no-drag flex items-center justify-center p-1">
      <Button onclick={() => goto('/')}>
        <Icon icon="ph:house-bold" />
      </Button>

      {#each Breadcrumbs.instance.segments as segment, i (i)}
        <span class="animate-in slide-in-from-left-20">
          <Icon icon="ph:caret-right-bold" />
        </span>

        <span class="animate-in slide-in-from-left-20">
          <Button onclick={() => goto(segment.href)}>
            <span>{segment.label}</span>
          </Button>
        </span>
      {/each}
    </div>
  </div>

  <div class="flex-1 h-full flex items-center justify-center">
    <button
      class={[
        'app-no-drag relative w-full flex items-center justify-center p-1.5 leading-tight rounded-sm transition-all duration-100',
        'focus-visible:outline-2',
        'cursor-pointer disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:bg-zinc-800 t-dark:focus-visible:outline-zinc-800',
        't-light:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
        't-rust:bg-rust-800 t-rust:focus-visible:outline-rust-750',
        't-midnight:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
      ]}
      onclick={() => openCommand()}
    >
      {m.placeholders__search_or_use_a_command()}

      <span class="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-2">
        <Key key="ctrl" />
        <Key key="k" />
      </span>
    </button>
  </div>

  <div class="flex-1 h-full flex items-center justify-end">
    <div class="app-no-drag flex items-center justify-center p-1">
      <Button onclick={() => window.api.window.minimize()} title={m.common__minimize()}>
        <Icon icon="ph:minus-bold" />
      </Button>

      <Button onclick={() => window.api.window.maximize()} title={m.common__maximize()}>
        <Icon icon="ph:arrows-out-simple-bold" />
      </Button>

      <Button onclick={() => window.api.window.hide()} title={m.common__hide()}>
        <Icon icon="ph:eye-slash-bold" />
      </Button>

      <Button onclick={() => window.api.window.close()} title={m.common__close()}>
        <Icon icon="ph:x-bold" />
      </Button>
    </div>
  </div>
</div>
