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

  const HEADING_CLASS = ['w-full px-2 py-1 text-sm opacity-50']

  const ITEM_CLASS = [
    'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity] duration-200',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    't-dark:data-selected:bg-zinc-800',
    't-light:data-selected:bg-zinc-200',
    't-rust:data-selected:bg-rust-800',
    't-midnight:data-selected:bg-gray-800'
  ]

  const SEPPARATOR_CLASS = ['w-full h-px my-2', 't-dark:bg-zinc-750', 't-light:bg-zinc-250', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']
</script>

<Dialog bind:open title={m.common__search()}>
  <Command.Root>
    <Command.Input
      class={[
        'h-9 w-full flex items-center justify-between gap-2 px-2 py-1 rounded-md border transition-[border,background-color] duration-200',
        'read-only:outline-none not-read-only:focus:outline-1',
        'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
        'disabled:opacity-50',
        't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
        't-light:bg-zinc-200 t-light:border-zinc-250 t-light:focus:outline-zinc-250',
        't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus:outline-rust-750',
        't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus:outline-gray-750'
      ]}
      placeholder={`${m.common__search()}...`}
    />

    <Command.List class="w-full">
      <Command.Viewport>
        <Command.Empty class="w-full flex items-center justify-center px-6 py-6 text-sm opacity-50">No results found...</Command.Empty>

        <Command.Group>
          <Command.GroupHeading class={HEADING_CLASS}>Uno a tres</Command.GroupHeading>

          <Command.GroupItems>
            <Command.Item value="uno" keywords={['uno']} class={ITEM_CLASS}>
              <Icon icon="ph:code-bold" />
              <span>Uno</span>
            </Command.Item>

            <Command.Item value="dos" keywords={['dos']} class={ITEM_CLASS}>
              <Icon icon="ph:code-bold" />
              <span>Dos</span>
            </Command.Item>

            <Command.Item value="tres" keywords={['tres']} class={ITEM_CLASS}>
              <Icon icon="ph:code-bold" />
              <span>Tres</span>
            </Command.Item>
          </Command.GroupItems>
        </Command.Group>

        <Command.Separator class={SEPPARATOR_CLASS} />

        <Command.Group>
          <Command.GroupHeading class={HEADING_CLASS}>Cuatro a seis</Command.GroupHeading>

          <Command.GroupItems>
            <Command.Item value="cuatro" keywords={['cuatro']} class={ITEM_CLASS}>
              <Icon icon="ph:code-bold" />
              <span>Cuatro</span>
            </Command.Item>

            <Command.Item value="cinco" keywords={['cinco']} class={ITEM_CLASS}>
              <Icon icon="ph:code-bold" />
              <span>Cinco</span>
            </Command.Item>

            <Command.Item value="seis" keywords={['seis']} class={ITEM_CLASS}>
              <Icon icon="ph:code-bold" />
              <span>Seis</span>
            </Command.Item>
          </Command.GroupItems>
        </Command.Group>
      </Command.Viewport>
    </Command.List>
  </Command.Root>
</Dialog>
