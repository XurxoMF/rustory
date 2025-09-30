<script lang="ts">
  import type { Snippet } from 'svelte'
  import { ScrollArea, type WithoutChild } from 'bits-ui'

  type ScrollableProps = Omit<WithoutChild<ScrollArea.RootProps>, 'class'> & {
    orientation: 'vertical' | 'horizontal' | 'both'
    headerContent?: Snippet | undefined
  }

  let { ref = $bindable(null), orientation = 'vertical', headerContent, children, ...restProps }: ScrollableProps = $props()
</script>

{#if headerContent}
  <div class="w-full flex items-center justify-between p-2">
    {@render headerContent?.()}
  </div>
{/if}

<ScrollArea.Root bind:ref type="always" class="w-full h-full flex flex-col min-h-0" {...restProps}>
  <ScrollArea.Viewport
    class={[
      'w-full h-full flex flex-col p-2',
      headerContent && ['border-t transition-[border] duration-200', 't-dark:border-t-zinc-750', 't-light:border-t-zinc-250', 't-rust:border-t-rust-750', 't-midnight:border-t-gray-750']
    ]}
  >
    {@render children?.()}
  </ScrollArea.Viewport>

  {#if orientation === 'vertical' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="vertical" class="w-1.5 flex p-px transition-[width] duration-200">
      <ScrollArea.Thumb class={['flex-1 rounded-full transition-[background] duration-200', 't-dark:bg-zinc-750', 't-light:bg-zinc-250', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'horizontal' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="vertical" class="h-2 flex p-px transition-[height] duration-200">
      <ScrollArea.Thumb class={['flex-1 rounded-full transition-[background] duration-200', 't-dark:bg-zinc-750', 't-light:bg-zinc-250', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'both'}
    <ScrollArea.Corner />
  {/if}
</ScrollArea.Root>
