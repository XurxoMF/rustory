<script lang="ts">
  import { route } from '@mateothegreat/svelte5-router'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '../components/Button.svelte'
</script>

<nav class={['shrink-0 h-full w-60 flex flex-col items-start justify-between gap-2 p-2 border-r transition-all', 'border-r-zinc-800']}>
  <div class="w-full flex flex-col items-start justify-between gap-1">
    {@render NavLink('ph:house-bold', m.common__home(), '/')}
    {@render NavLink('ph:git-fork-bold', m.vintagestory__versions(), '/vs/versions')}
  </div>

  <div class="w-full flex flex-col items-start justify-between gap-1">
    <Button mode="transparent" width="full" align="start" onclick={() => window.api.shell.openURL('https://ko-fi.com/xurxomf')}>
      <Icon icon="ph:heart-duotone" class="text-2xl text-pink-500" />
      <span class="text-pink-500">{m.common__donations()}</span>
    </Button>
    {@render NavLink('ph:gear-bold', m.common__config(), '/config')}
  </div>
</nav>

{#snippet NavLink(icon: string, text: string, link: string = '/')}
  <a
    href={link}
    use:route={{
      active: { absolute: true, class: ['text-current/100', 'bg-zinc-800'] }
    }}
    class={[
      'w-full h-9 flex items-center justify-start gap-2 p-2 leading-tight rounded-sm outline-none transition-all',
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      'text-current/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
    ]}
  >
    <Icon {icon} class="text-2xl" />
    {text}
  </a>
{/snippet}
