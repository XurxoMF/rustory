<script lang="ts">
  import { Collapsible, type WithoutChild } from 'bits-ui'
  import { slide } from 'svelte/transition'
  import type { Snippet } from 'svelte'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  const PADDING_CLASSES = {
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
  <Collapsible.Trigger class={['w-full flex items-center justify-between p-2 transition-[opacity] duration-200', 'outline-none', 'cursor-pointer disabled:cursor-not-allowed', 'disabled:opacity-40']}>
    {@render headerContent?.()}
    <Icon icon="ph:caret-up-down" />
  </Collapsible.Trigger>

  <Collapsible.Content forceMount>
    {#snippet child({ props, open })}
      {#if open}
        <div transition:slide={{ duration: 200 }} {...props}>
          <div
            class={[
              'w-full flex flex-col border-t transition-[border] duration-200',
              't-dark:border-t-zinc-750',
              't-light:border-t-zinc-300',
              't-rust:border-t-rust-750',
              't-midnight:border-t-gray-750',
              PADDING_CLASSES[padding]
            ]}
          >
            {@render children?.()}
          </div>
        </div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>
