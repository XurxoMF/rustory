<script lang="ts">
  import { Collapsible, type WithoutChild } from 'bits-ui'
  import type { Snippet } from 'svelte'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  const PADDING_CLASSES = {
    0: ['p-0'],
    1: ['p-1'],
    2: ['p-2'],
    3: ['p-3'],
    4: ['p-4'],
    5: ['p-5'],
    6: ['p-6'],
    7: ['p-7'],
    8: ['p-8']
  } as const

  type PaddingTypes = keyof typeof PADDING_CLASSES

  type CollapsibleContainerProps = Omit<WithoutChild<Collapsible.RootProps>, 'class'> & {
    headerContent: Snippet
    padding?: PaddingTypes | undefined
  }

  let { open = $bindable(false), ref = $bindable(null), headerContent, padding = 3, children, ...restProps }: CollapsibleContainerProps = $props()
</script>

<Collapsible.Root bind:open bind:ref class="w-full flex flex-col" {...restProps}>
  <Collapsible.Trigger
    class={[
      'w-full flex items-center justify-between p-2 rounded-t-md data-[state=closed]:rounded-b-md transition-[opacity,border-radius] duration-200',
      'focus-visible:outline-2',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      't-dark:focus-visible:outline-zinc-750',
      't-light:focus-visible:outline-zinc-300',
      't-rust:focus-visible:outline-rust-750',
      't-midnight:focus-visible:outline-gray-750'
    ]}
  >
    {@render headerContent?.()}
    <Icon icon="ph:caret-up-down" />
  </Collapsible.Trigger>

  <Collapsible.Content
    class={[
      'w-full flex flex-col overflow-hidden border-t transition-[border] duration-200',
      't-dark:border-t-zinc-750',
      't-light:border-t-zinc-300',
      't-rust:border-t-rust-750',
      't-midnight:border-t-gray-750',
      'data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up',
      PADDING_CLASSES[padding]
    ]}
  >
    {@render children?.()}
  </Collapsible.Content>
</Collapsible.Root>
