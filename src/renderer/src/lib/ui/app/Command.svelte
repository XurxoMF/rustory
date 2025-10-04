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
  import { Command } from 'bits-ui'

  import { m } from '@renderer/paraglide/messages'

  import Dialog from '@renderer/lib/ui/form/Dialog.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { goto } from '@mateothegreat/svelte5-router'

  const HEADING_CLASS = ['w-full px-2 py-1 text-sm opacity-40']

  const ITEM_CLASS = [
    'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity,background-color] duration-200',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    't-dark:data-selected:bg-zinc-800',
    't-light:data-selected:bg-zinc-200',
    't-rust:data-selected:bg-rust-800',
    't-midnight:data-selected:bg-gray-800'
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

<Dialog bind:open title={m.common__search()}>
  <Command.Root>
    <Command.Input
      class={[
        'h-9 w-full flex items-center justify-between gap-2 mb-2 px-2 py-1 rounded-md border transition-[border,background-color] duration-200',
        'focus-visible:outline-1',
        'cursor-pointer disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
        't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
        't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
        't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750'
      ]}
      placeholder={`${m.common__search()}...`}
    />

    <Command.List>
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
</Dialog>
