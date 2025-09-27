<script lang="ts">
  import { ScrollArea, type WithoutChild } from 'bits-ui'

  type ScrollableProps = Omit<WithoutChild<ScrollArea.RootProps>, 'class'> & {
    orientation: 'vertical' | 'horizontal' | 'both'
  }

  let { ref = $bindable(null), orientation = 'vertical', children, ...restProps }: ScrollableProps = $props()
</script>

<ScrollArea.Root bind:ref type="always" class="w-full h-full overflow-hidden" {...restProps}>
  <ScrollArea.Viewport class="w-full h-full">
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
