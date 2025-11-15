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
</script>

<script lang="ts">
  import { Dialog, Command } from 'bits-ui'
  import { goto } from '@mateothegreat/svelte5-router'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Button from '@renderer/lib/ui/components/Button.svelte'

  const HEADING_CLASS = ['w-full px-2 py-1 text-sm opacity-40']

  const ITEM_CLASS = [
    'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-all duration-100',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    't-dark:data-selected:bg-zinc-800'
  ]

  // const SEPPARATOR_CLASS = ['w-full h-px my-2', 't-dark:bg-zinc-750', 't-light:bg-zinc-350', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']
  // <Command.Separator class={SEPPARATOR_CLASS} />

  type CommandItem = {
    value: string
    keywords: string[]
    label: string
    icon: string
    onclick: () => void | Promise<void>
  }

  const PAGES: CommandItem[] = [
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
</script>

<Dialog.Root bind:open>
  <Dialog.Portal to="#portal">
    <Dialog.Overlay class={['absolute top-0 z-50 w-screen h-screen backdrop-blur-xs transition-[background-color] duration-100', 't-dark:bg-zinc-850/20']} />

    <Dialog.Content
      class={[
        'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[50vw] max-w-100 h-screen p-2 z-100 rounded-md border shadow/20 transition-all duration-100',
        't-dark:bg-zinc-850 t-dark:border-zinc-800'
      ]}
    >
      <div class="w-full flex items-center justify-between gap-2">
        <Dialog.Title>{m.common__search()}</Dialog.Title>

        <Button tabindex={-1} onclick={() => (open = false)}>
          <Icon icon="ph:x" class="opacity-40" />
        </Button>
      </div>

      <Dialog.Description class="opacity-40 mb-2">Description...</Dialog.Description>

      <Command.Root>
        <Command.Input
          class={[
            'h-9 w-full flex items-center justify-between gap-2 mb-2 px-2 py-1 rounded-md shadow/20 transition-all duration-100',
            'focus-visible:outline-2',
            'cursor-pointer disabled:cursor-not-allowed',
            'disabled:opacity-40',
            't-dark:bg-zinc-800 t-dark:focus-visible:outline-zinc-800'
          ]}
          placeholder={`${m.common__search()}...`}
        />

        <Command.List class="w-[40vw]">
          <Command.Viewport>
            <Command.Empty class="w-full flex items-center justify-center px-6 py-6 text-sm opacity-40">{`${m.common__no_results_found()}...`}</Command.Empty>

            <Command.Group>
              <Command.GroupHeading class={HEADING_CLASS}>{m.common__pages()}</Command.GroupHeading>

              <Command.GroupItems>
                {#each PAGES as { value, keywords, label, icon, onclick } (value)}
                  <Command.Item
                    {value}
                    {keywords}
                    onSelect={() => {
                      onclick()
                      closeCommand()
                    }}
                    class={ITEM_CLASS}
                  >
                    <Icon {icon} />
                    {label}
                  </Command.Item>
                {/each}
              </Command.GroupItems>
            </Command.Group>
          </Command.Viewport>
        </Command.List>
      </Command.Root>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
