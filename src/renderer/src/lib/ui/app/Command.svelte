<script lang="ts" module>
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
    icon: string
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

  import Icon from '@renderer/lib/ui/components/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'
  import FlexContainer from '@renderer/lib/ui/layout/Flex/FlexContainer.svelte'

  const GROUPS: CommandGroup[] = [
    {
      label: m.common__pages(),
      items: [
        {
          value: 'home-page',
          keywords: [m.common__home(), m.common__pages()],
          label: m.common__home(),
          icon: 'ph:house',
          onclick: () => goto('/')
        },
        {
          value: 'vs-versions-page',
          keywords: [m.vintagestory__versions(), m.common__pages()],
          label: m.vintagestory__versions(),
          icon: 'ph:git-fork',
          onclick: () => goto('/vs/versions')
        },
        {
          value: 'config-page',
          keywords: [m.common__config(), m.common__pages()],
          label: m.common__config(),
          icon: 'ph:gear',
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
        'absolute top-0 left-0 z-100 w-screen h-screen backdrop-blur-xs transition-colors',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0'
      ]}
    />

    <Dialog.Content
      class={[
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-100 w-1/3 max-w-full h-fit max-h-full flex flex-col gap-4 p-8 rounded-md shadow-xl outline-none transition-colors @container',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        'bg-zinc-900/95 inset-ring-zinc-800'
      ]}
    >
      <FlexContainer gap="base" alignX="between">
        <Dialog.Title class="text-2xl font-bold">{m.common__search()}</Dialog.Title>

        <Button mode="transparent" tabindex={-1}>
          <Icon icon="ph:x-bold" class="text-current/50" />
        </Button>
      </FlexContainer>

      <Dialog.Description class="text-current/50 mb-4">Look for pages, VS Instances and more...</Dialog.Description>

      <Command.Root>
        <Command.Input
          class={[
            'w-full min-w-9 min-h-9 flex items-center justify-between gap-2 p-2 leading-tight rounded-sm outline-none transition-colors',
            'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
            'disabled:opacity-40',
            'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
            'bg-zinc-800/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
          ]}
          placeholder={`${m.common__search()}...`}
        />

        <Command.List class="w-full @container">
          <Command.Viewport class="w-full flex flex-col gap-2">
            <Command.Empty class={['w-full flex items-center justify-center mt-8 text-current/50 cursor-pointer']}>
              {`${m.common__no_results_found()}...`}
            </Command.Empty>

            {@render CRenderGroups(GROUPS)}
          </Command.Viewport>
        </Command.List>
      </Command.Root>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

{#snippet CGroup({ label, items }: CommandGroup)}
  <Command.Group>
    <Command.GroupHeading class={['text-current/50 mx-2 my-4']}>{label}</Command.GroupHeading>

    <Command.GroupItems>
      {#each items as item (item.value)}
        {@render CItem(item)}
      {/each}
    </Command.GroupItems>
  </Command.Group>
{/snippet}

{#snippet CItem({ icon, label, keywords, value, onclick }: CommandItem)}
  <Command.Item
    {value}
    {keywords}
    onSelect={() => {
      onclick()
      closeCommand()
    }}
    class={[
      'w-full flex items-center justify-start gap-2 p-2 rounded-sm leading-tight outline-none transition-colors',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      'not-data-disabled:hover:bg-zinc-800 data-selected:bg-zinc-800'
    ]}
  >
    <Icon {icon} class="shrink-0 w-6 h-6 flex items-center justify-center text-lg" />
    {label}
  </Command.Item>
{/snippet}

{#snippet CRenderGroups(groups: CommandGroup[])}
  {#each groups as group, i}
    {@render CGroup(group)}

    {#if i < groups.length - 1}
      <Command.Separator class={['w-full h-px', 'bg-zinc-800']} />
    {/if}
  {/each}
{/snippet}
