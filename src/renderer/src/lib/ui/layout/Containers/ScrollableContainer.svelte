<script lang="ts">
  import type { Snippet } from 'svelte'
  import { ScrollArea, type WithoutChild } from 'bits-ui'

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

  type ScrollableProps = Omit<WithoutChild<ScrollArea.RootProps>, 'class'> & {
    orientation: 'vertical' | 'horizontal' | 'both'
    headerContent?: Snippet | undefined
    padding?: PaddingTypes | undefined
  }

  let { ref = $bindable(null), orientation = 'vertical', headerContent, padding = 3, children, ...restProps }: ScrollableProps = $props()
</script>

{#if headerContent}
  <div class="w-full flex items-center justify-between p-2">
    {@render headerContent?.()}
  </div>
{/if}

<ScrollArea.Root bind:ref type="always" class="w-full h-full flex flex-col min-h-0" {...restProps}>
  <ScrollArea.Viewport
    class={[
      'w-full h-full flex flex-col',
      headerContent && ['border-t transition-[border] duration-200', 't-dark:border-t-zinc-750', 't-light:border-t-zinc-300', 't-rust:border-t-rust-750', 't-midnight:border-t-gray-750'],
      PADDING_CLASSES[padding]
    ]}
  >
    {@render children?.()}
  </ScrollArea.Viewport>

  {#if orientation === 'vertical' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="vertical" class="w-1.5 flex p-px transition-[width] duration-200">
      <ScrollArea.Thumb class={['flex-1 rounded-full transition-[background] duration-200', 't-dark:bg-zinc-750', 't-light:bg-zinc-300', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'horizontal' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="vertical" class="h-2 flex p-px transition-[height] duration-200">
      <ScrollArea.Thumb class={['flex-1 rounded-full transition-[background] duration-200', 't-dark:bg-zinc-750', 't-light:bg-zinc-300', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'both'}
    <ScrollArea.Corner />
  {/if}
</ScrollArea.Root>
