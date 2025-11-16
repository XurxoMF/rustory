<script lang="ts" module>
  import { ScrollArea, type WithoutChild } from 'bits-ui'

  export type ScrollableContainerProps = Omit<WithoutChild<ScrollArea.RootProps>, 'class'> & {
    orientation?: 'vertical' | 'horizontal' | 'both' | undefined
  }
</script>

<script lang="ts">
  let { ref = $bindable(null), orientation = 'vertical', children, ...restProps }: ScrollableContainerProps = $props()
</script>

<ScrollArea.Root bind:ref type="always" class="w-full h-full" {...restProps}>
  <ScrollArea.Viewport class="w-full h-full">
    {@render children?.()}
  </ScrollArea.Viewport>

  {#if orientation === 'vertical' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="vertical" class="w-1.5 flex p-px transition-colors">
      <ScrollArea.Thumb class={['flex-1 rounded-full transition-colors', 't-dark:bg-zinc-800']} />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'horizontal' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="vertical" class="h-2 flex p-px transition-color">
      <ScrollArea.Thumb class={['flex-1 rounded-full transition-colors', 't-dark:bg-zinc-800']} />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'both'}
    <ScrollArea.Corner />
  {/if}
</ScrollArea.Root>
