<script lang="ts">
  import { route } from '@mateothegreat/svelte5-router'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '../components/Button.svelte'
</script>

<nav
  class={[
    'shrink-0 h-full w-60 flex flex-col items-start justify-between gap-2 p-2 border-r transition-all duration-100',
    't-dark:text-zinc-200/50 t-dark:border-r-zinc-800'
  ]}
>
  <div class="w-full flex flex-col items-start justify-between gap-1">
    {@render NavLink('ph:house-bold', m.common__home(), '/')}
    {@render NavLink('ph:git-fork-bold', m.vintagestory__versions(), '/vs/versions')}
  </div>

  <div class="w-full flex flex-col items-start justify-between gap-1">
    <Button mode="transparent" width="full" align="start" onclick={() => window.api.shell.openURL('https://ko-fi.com/xurxomf')}>
      <Icon icon="ph:heart-duotone" class="text-2xl text-pink-700" />
      {m.common__donations()}
    </Button>
    {@render NavLink('ph:gear-bold', m.common__config(), '/config')}
  </div>
</nav>

{#snippet NavLink(icon: string, text: string, link: string = '/')}
  <a
    href={link}
    use:route={{
      active: { absolute: true, class: ['t-dark:bg-zinc-800'] }
    }}
    class={[
      'w-full h-9 flex items-center justify-start gap-2 p-2 leading-tight rounded-sm transition-all duration-100',
      'outline-transparent focus-visible:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      't-dark:hover:bg-zinc-850 t-dark:outline-zinc-700'
    ]}
  >
    <Icon {icon} class="text-2xl" />
    {text}
  </a>
{/snippet}
