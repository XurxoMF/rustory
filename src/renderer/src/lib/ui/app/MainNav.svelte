<script lang="ts">
  import { type Component } from 'svelte'
  import { route } from '@mateothegreat/svelte5-router'

  import { m } from '@renderer/paraglide/messages'

  import { type IconProps } from '@renderer/lib/ui/components/Icons/BaseIcon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { PHGearBoldIcon, PHGitForkBoldIcon, PHHandHeartDuotoneIcon, PHHouseBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'
</script>

<nav class={['shrink-0 h-full w-60 flex flex-col items-start justify-between gap-2 p-2 border-r transition-colors', 'border-r-zinc-800']}>
  <div class="w-full flex flex-col items-start justify-between gap-1">
    {@render NavLink(PHHouseBoldIcon, m.common__home(), '/')}
    {@render NavLink(PHGitForkBoldIcon, m.vintagestory__versions(), '/vs/versions')}
  </div>

  <div class="w-full flex flex-col items-start justify-between gap-1">
    <Button mode="transparent" width="full" align="start" onclick={() => window.api.shell.openURL('https://ko-fi.com/xurxomf')}>
      <PHHandHeartDuotoneIcon class="text-2xl text-pink-500" />
      <span class="text-pink-500">{m.common__donations()}</span>
    </Button>
    {@render NavLink(PHGearBoldIcon, m.common__config(), '/config')}
  </div>
</nav>

{#snippet NavLink(Icon: Component<IconProps>, text: string, link: string = '/')}
  <a
    href={link}
    use:route={{
      active: { absolute: true, class: ['text-current', 'bg-zinc-800'] }
    }}
    class={[
      'w-full h-9 flex items-center justify-start gap-2 p-2 font-medium leading-tight rounded-sm outline-none transition-colors',
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      'text-current/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
    ]}
  >
    <Icon class="text-2xl" />
    {text}
  </a>
{/snippet}
