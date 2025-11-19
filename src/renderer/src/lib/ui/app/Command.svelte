<script lang="ts" module>
  import type { Component } from 'svelte'

  import { type IconProps } from '@renderer/lib/ui/components/Icons/BaseIcon.svelte'

  let open = $state(false)

  export function closeCommand(): void {
    open = false
  }

  export function openCommand(): void {
    open = true
  }

  export function toggleCommand(): void {
    open = !open
  }

  export type CommandItem = {
    value: string
    keywords: string[]
    label: string
    icon: Component<IconProps>
    onclick: () => void | Promise<void>
  }

  export type CommandGroup = {
    label: string
    items: CommandItem[]
  }
</script>

<script lang="ts">
  import { Dialog, Command } from 'bits-ui'
  import { goto } from '@mateothegreat/svelte5-router'

  import { m } from '@renderer/paraglide/messages'

  import Button from '@renderer/lib/ui/components/Button.svelte'
  import { FlexContainer } from '@renderer/lib/ui/layout/Flex'
  import { PHGearBoldIcon, PHGitForkBoldIcon, PHHouseBoldIcon, PHXBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let groups: CommandGroup[] = [
    {
      label: m.common__pages(),
      items: [
        {
          value: 'home-page',
          keywords: [m.common__home(), m.common__pages()],
          label: m.common__home(),
          icon: PHHouseBoldIcon,
          onclick: () => goto('/')
        },
        {
          value: 'vs-versions-page',
          keywords: [m.vintagestory__versions(), m.common__pages()],
          label: m.vintagestory__versions(),
          icon: PHGitForkBoldIcon,
          onclick: () => goto('/vs/versions')
        },
        {
          value: 'config-page',
          keywords: [m.common__config(), m.common__pages()],
          label: m.common__config(),
          icon: PHGearBoldIcon,
          onclick: () => goto('/config')
        }
      ]
    }
  ]
</script>

<Dialog.Root bind:open>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay
      class={[
        'absolute top-0 left-0 z-100 w-screen h-screen backdrop-blur-xs',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
      ]}
    />

    <Dialog.Content
      class={[
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-100 w-1/3 max-w-full h-fit max-h-full rounded-md shadow-xl outline-none @container',
        'inset-ring-2',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'bg-zinc-900/95 inset-ring-zinc-800',
        't-ligh:bg-zinc-100/95 t-light:inset-ring-zinc-300'
      ]}
    >
      <FlexContainer direction="col" height="full" padding="xl" gap="xl">
        <FlexContainer direction="col" gap="xs">
          <FlexContainer gap="base" alignX="between">
            <Dialog.Title class="text-2xl font-bold">{m.common__search()}</Dialog.Title>

            <Button mode="transparent" tabindex={-1}>
              <PHXBoldIcon class="text-current/50" />
            </Button>
          </FlexContainer>

          <Dialog.Description class="text-current/50">Look for pages, VS Instances and more...</Dialog.Description>
        </FlexContainer>

        <Command.Root class="w-full">
          <Command.Input
            class={[
              'w-full min-w-10 min-h-10 flex items-center justify-between gap-2 p-2 rounded-sm outline-none',
              'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
              'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
              'disabled:opacity-40',
              'placeholder:text-current/30',
              'bg-zinc-800/50 not-disabled:hover:bg-zinc-800/70 inset-ring-zinc-800 ring-zinc-800',
              't-light:bg-zinc-300/50 t-light:not-disabled:hover:bg-zinc-300/70 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
            ]}
            placeholder={`${m.common__search()}...`}
          />

          <Command.List class="max-h-96 w-full overflow-y-auto @container">
            <Command.Viewport class="w-full">
              <Command.Empty class={['w-full flex items-center justify-center mt-8 text-current/50 cursor-pointer']}>
                {`${m.common__no_results_found()}...`}
              </Command.Empty>

              {@render CRenderGroups(groups)}
            </Command.Viewport>
          </Command.List>
        </Command.Root>
      </FlexContainer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

{#snippet CGroup({ label, items }: CommandGroup)}
  <Command.Group class={['flex flex-col my-2']}>
    <Command.GroupHeading class={['text-current/50 font-medium m-2']}>{label}</Command.GroupHeading>

    <Command.GroupItems>
      {#each items as item (item.value)}
        {@render CItem(item)}
      {/each}
    </Command.GroupItems>
  </Command.Group>
{/snippet}

{#snippet CItem({ icon: Icon, label, keywords, value, onclick }: CommandItem)}
  <Command.Item
    {value}
    {keywords}
    onSelect={() => {
      onclick()
      closeCommand()
    }}
    class={[
      'w-full flex items-center justify-start gap-2 p-2 rounded-sm font-medium outline-none',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      'not-data-disabled:hover:bg-zinc-800/70 data-selected:bg-zinc-800',
      't-light:not-data-disabled:hover:bg-zinc-300/70 t-light:data-selected:bg-zinc-300'
    ]}
  >
    <Icon class="shrink-0 flex items-center justify-center text-lg" />
    {label}
  </Command.Item>
{/snippet}

{#snippet CRenderGroups(groups: CommandGroup[])}
  {#each groups as group, i}
    {@render CGroup(group)}

    {#if i < groups.length - 1}
      <Command.Separator class={['w-full h-px', 'bg-zinc-800', 't-light:bg-zinc-300']} />
    {/if}
  {/each}
{/snippet}
