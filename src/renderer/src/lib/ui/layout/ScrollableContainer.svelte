<script lang="ts" module>
  import { ScrollArea, type WithoutChild } from 'bits-ui'

  export type ScrollableContainerProps = WithoutKeys<WithoutChild<ScrollArea.RootProps>, 'class'> & {
    orientation?: 'vertical' | 'horizontal' | 'both' | undefined
    isBreakpoint?: boolean | undefined
  }
</script>

<script lang="ts">
  let { ref = $bindable(null), orientation = 'vertical', isBreakpoint = false, children, ...restProps }: ScrollableContainerProps = $props()
</script>

<ScrollArea.Root bind:ref type="always" class="w-full h-full" {...restProps}>
  <ScrollArea.Viewport class={['w-full h-full outline-none', isBreakpoint && '@container']}>
    {@render children?.()}
  </ScrollArea.Viewport>

  {#if orientation === 'vertical' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="vertical" class="w-1">
      <ScrollArea.Thumb class={['rounded-full', 't-dark:bg-zinc-800', 't-light:bg-zinc-300']} />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'horizontal' || orientation === 'both'}
    <ScrollArea.Scrollbar orientation="horizontal" class="flex h-1">
      <ScrollArea.Thumb class={['rounded-full', 't-dark:bg-zinc-800', 't-light:bg-zinc-300']} />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === 'both'}
    <ScrollArea.Corner />
  {/if}
</ScrollArea.Root>
