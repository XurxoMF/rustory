<script lang="ts">
  import { m } from '@renderer/paraglide/messages'
  import { goto } from '@mateothegreat/svelte5-router'

  import { Reloader } from '@renderer/lib/classes/Reloader.svelte'
  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import { openCommand } from '@renderer/lib/ui/app/Command.svelte'

  import Key from '@renderer/lib/ui/components/Key.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Separator from '@renderer/lib/ui/components/Separator.svelte'
</script>

<div class={['app-drag shrink-0 w-full flex items-center justify-between gap-2 border-b transition-colors', 'text-current/50 border-b-zinc-800']}>
  <div class="flex-1 h-full flex items-center justify-start">
    <div class="app-no-drag flex items-center justify-center p-1">
      <Button mode="transparent" onclick={() => history.back()} title={m.common__previous()}>
        <Icon icon="ph:caret-left-bold" />
      </Button>

      <Button mode="transparent" onclick={() => history.forward()} title={m.common__next()}>
        <Icon icon="ph:caret-right-bold" />
      </Button>

      <Button mode="transparent" onclick={() => Reloader.instance.executeTasks()} title={m.common__reload()}>
        <Icon icon="ph:arrow-clockwise-bold" />
      </Button>
    </div>

    <Separator orientation="vertical" />

    <div class="app-no-drag flex items-center justify-center p-1">
      <Button mode="transparent" onclick={() => goto('/')}>
        <Icon icon="ph:house-bold" />
      </Button>

      {#each Breadcrumbs.instance.segments as segment, i (i)}
        <span class="animate-in slide-in-from-left-20">
          <Icon icon="ph:caret-right-bold" />
        </span>

        <span class="animate-in slide-in-from-left-20">
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

        <span class="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-2">
          <Key key="ctrl" />
          <Key key="k" />
        </span>
      </span>
    </Button>
  </div>

  <div class="flex-1 h-full flex items-center justify-end">
    <div class="app-no-drag flex items-center justify-center p-1">
      <Button mode="transparent" onclick={() => window.api.window.minimize()} title={m.common__minimize()}>
        <Icon icon="ph:minus-bold" />
      </Button>

      <Button mode="transparent" onclick={() => window.api.window.maximize()} title={m.common__maximize()}>
        <Icon icon="ph:arrows-out-simple-bold" />
      </Button>

      <Button mode="transparent" onclick={() => window.api.window.hide()} title={m.common__hide()}>
        <Icon icon="ph:eye-slash-bold" />
      </Button>

      <Button mode="transparent" onclick={() => window.api.window.close()} title={m.common__close()}>
        <Icon icon="ph:x-bold" />
      </Button>
    </div>
  </div>
</div>
