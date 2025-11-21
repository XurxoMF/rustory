<script lang="ts" module>
  import { type Component } from 'svelte'

  import { type IconProps } from '@renderer/lib/ui/components/Icons/BaseIcon.svelte'

  export type NavLinkProps = {
    Icon: Component<IconProps>
    name: string
    link: string
    absolute?: boolean | undefined
  }

  export type NavGroupProps = {
    id: string
    Icon: Component<IconProps>
    name: string
    link?: string
    links: NavLinkProps[]
  }
</script>

<script lang="ts">
  import { route } from '@mateothegreat/svelte5-router'
  import { Collapsible } from 'bits-ui'

  import Button from '@renderer/lib/ui/components/Button.svelte'
  import {
    PHGearBoldIcon,
    PHGitForkBoldIcon,
    PHHandHeartDuotoneIcon,
    PHHouseBoldIcon,
    PHFolderOpenBoldIcon,
    PHCaretUpDownBoldIcon
  } from '@renderer/lib/ui/components/Icons/Phosphor'
  import FlexContainer from '@renderer/lib/ui/layout/Flex/FlexContainer.svelte'

  let openGroup: string = $state('')
</script>

<nav class={['shrink-0 h-full w-60 flex flex-col items-start justify-between gap-2 p-2 border-r', 'border-r-zinc-800', 't-light:border-r-zinc-200']}>
  <FlexContainer direction="col" gap="xs">
    {@render NavLink({ Icon: PHHouseBoldIcon, name: 'Home', link: '/', absolute: true })}
    {@render NavGroup({
      id: 'vs',
      Icon: PHFolderOpenBoldIcon,
      name: 'Vintage Story',
      links: [
        { Icon: PHFolderOpenBoldIcon, name: 'Instances', link: '/vs/instances' },
        { Icon: PHGitForkBoldIcon, name: 'Versions', link: '/vs/versions' }
      ]
    })}
  </FlexContainer>

  <FlexContainer direction="col" gap="xs">
    <Button mode="transparent" width="full" align="start" onclick={() => window.api.shell.openURL('https://ko-fi.com/xurxomf')}>
      <PHHandHeartDuotoneIcon class="text-xl text-pink-500" />
      <span class="text-pink-500">Support Us</span>
    </Button>
    {@render NavLink({ Icon: PHGearBoldIcon, name: 'Config', link: '/config' })}
  </FlexContainer>
</nav>

{#snippet NavLink({ Icon, name, link, absolute = false }: NavLinkProps)}
  <a
    href={link}
    use:route={{
      active: { absolute, class: ['text-current', 'bg-zinc-800', 't-light:bg-zinc-300'] }
    }}
    class={[
      'w-full h-9 flex items-center justify-between gap-2 p-2 text-current/50 font-medium rounded-sm outline-none',
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      'not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:not-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ]}
  >
    <FlexContainer gap="sm">
      <Icon class="text-xl" />
      {name}
    </FlexContainer>
  </a>
{/snippet}

{#snippet NavGroup({ id, Icon, name, link, links }: NavGroupProps)}
  <Collapsible.Root open={openGroup === id} onOpenChange={(open) => (openGroup = open ? id : '')} class="w-full flex flex-col gap-1">
    {#if link}
      <a
        href={link}
        use:route={{
          active: { absolute: false, class: ['text-current', 'bg-zinc-800', 't-light:bg-zinc-300'] }
        }}
        class={[
          'relative w-full h-9 flex items-center justify-start gap-2 p-2 text-current/50 font-medium rounded-sm outline-none',
          'focus-visible:inset-ring-1 focus-visible:ring-2',
          'cursor-pointer disabled:cursor-not-allowed',
          'disabled:opacity-40',
          'not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
          't-light:not-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
        ]}
      >
        <FlexContainer gap="sm">
          <Icon class="text-xl" />
          {name}
        </FlexContainer>

        <Collapsible.Trigger
          class={[
            'absolute right-0 w-9 h-9 flex items-center justify-center p-2 text-current/50 font-medium rounded-sm outline-none',
            'focus-visible:inset-ring-1 focus-visible:ring-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            'not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
            't-light:not-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
          ]}
        >
          <PHCaretUpDownBoldIcon />
        </Collapsible.Trigger>
      </a>
    {:else}
      <div
        class={[
          'relative w-full h-9 flex items-center justify-start gap-2 p-2 text-current/50 font-medium rounded-sm',
          'hover:bg-zinc-800',
          't-light:hover:bg-zinc-300'
        ]}
      >
        <FlexContainer gap="sm">
          <Icon class="text-xl" />
          {name}
        </FlexContainer>

        <Collapsible.Trigger
          class={[
            'absolute right-0 w-9 h-9 flex items-center justify-center p-2 text-current/50 font-medium rounded-sm outline-none',
            'focus-visible:inset-ring-1 focus-visible:ring-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            'not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
            't-light:not-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
          ]}
        >
          <PHCaretUpDownBoldIcon />
        </Collapsible.Trigger>
      </div>
    {/if}

    <div class="pl-1">
      <Collapsible.Content
        class={[
          'w-full pl-1 border-l overflow-hidden',
          'data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up',
          'border-l-zinc-800',
          't-light:border-l-zinc-300'
        ]}
      >
        <FlexContainer direction="col" gap="xs">
          {#each links as link}
            {@render NavLink(link)}
          {/each}
        </FlexContainer>
      </Collapsible.Content>
    </div>
  </Collapsible.Root>
{/snippet}
