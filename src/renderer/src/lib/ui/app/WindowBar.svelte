<script lang="ts">
  import { goto } from '@mateothegreat/svelte5-router'

  import { m } from '@renderer/paraglide/messages'

  import { Reloader } from '@renderer/lib/classes/Reloader.svelte'
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'
  import { MainWindow } from '@renderer/lib/classes/MainWindow.svelte'

  import { openCommand } from '@renderer/lib/ui/app/Command.svelte'

  import Key from '@renderer/lib/ui/components/Key.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import Separator from '@renderer/lib/ui/components/Separator.svelte'
  import {
    PHArrowClockwiseBoldIcon,
    PHArrowsInSimpleBoldIcon,
    PHArrowsOutSimpleBoldIcon,
    PHCaretLeftBoldIcon,
    PHCaretRightBoldIcon,
    PHHouseBoldIcon,
    PHMinusBoldIcon,
    PHTrayArrowDownBoldIcon,
    PHXBoldIcon
  } from '@renderer/lib/ui/components/Icons/Phosphor'
</script>

{#if !MainWindow.instance.fullscreened}
  <div
    class={[
      'app-drag shrink-0 w-full flex items-center justify-between gap-2 text-current/50 border-b',
      'border-b-zinc-800',
      't-light:border-b-zinc-300'
    ]}
  >
    <div class="flex-1 h-full flex items-center justify-start">
      <div class="app-no-drag flex items-center justify-center p-1">
        <Button mode="transparent" onclick={() => history.back()} title={m.common__previous()}>
          <PHCaretLeftBoldIcon />
        </Button>

        <Button mode="transparent" onclick={() => history.forward()} title={m.common__next()}>
          <PHCaretRightBoldIcon />
        </Button>

        <Button mode="transparent" onclick={() => Reloader.instance.executeTasks()} title={m.common__reload()}>
          <PHArrowClockwiseBoldIcon />
        </Button>
      </div>

      <Separator orientation="vertical" />

      <div class="app-no-drag flex items-center justify-center p-1">
        <Button mode="transparent" onclick={() => goto('/')}>
          <PHHouseBoldIcon />
        </Button>

        {#each Breadcrumbs.instance.segments as segment, i (i)}
          <span class="flex items-center justify-center animate-in slide-in-from-left-20">
            <PHCaretRightBoldIcon />
          </span>

          <span class="flex items-center justify-center animate-in slide-in-from-left-20">
            <Button mode="transparent" onclick={() => goto(segment.href)}>
              <span>{segment.label}</span>
            </Button>
          </span>
        {/each}
      </div>
    </div>

    <div class="app-no-drag flex-1 h-full flex items-center justify-center">
      <Button mode="neutral" width="full" onclick={() => openCommand()}>
        <span class="relative w-full h-full">
          {m.placeholders__search_or_use_a_command()}

          <span class="absolute top-1/2 -translate-y-1/2 right-0 flex items-center gap-1">
            <Key key="ctrl" />
            <Key key="k" />
          </span>
        </span>
      </Button>
    </div>

    <div class="flex-1 h-full flex items-center justify-end">
      <div class="app-no-drag flex items-center justify-center p-1">
        <Button mode="transparent" onclick={() => window.api.window.minimize()} title={m.common__minimize()}>
          <PHMinusBoldIcon />
        </Button>

        <Button mode="transparent" onclick={() => window.api.window.maximize()} title={m.common__maximize()}>
          {#if MainWindow.instance.maximized}
            <PHArrowsInSimpleBoldIcon />
          {:else}
            <PHArrowsOutSimpleBoldIcon />
          {/if}
        </Button>

        <Button mode="transparent" onclick={() => window.api.window.hide()} title={m.common__hide()}>
          <PHTrayArrowDownBoldIcon />
        </Button>

        <Button mode="transparent" onclick={() => window.api.window.close()} title={m.common__close()}>
          <PHXBoldIcon />
        </Button>
      </div>
    </div>
  </div>
{/if}
