<script lang="ts">
  import { ScrollArea, type WithoutChild } from 'bits-ui'

  type ScrollableContainerPropsType = WithoutChild<ScrollArea.RootProps> & {
    orientation: 'vertical' | 'horizontal' | 'both'
    viewportClasses: string | undefined
  }

  let { ref = $bindable(null), orientation = 'vertical', viewportClasses, children, ...restProps }: ScrollableContainerPropsType = $props()
</script>

<ScrollArea.Root bind:ref type="always" {...restProps}>
  <ScrollArea.Viewport class={viewportClasses}>
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
