<script lang="ts">
  import { fade } from 'svelte/transition'
  import { ScrollArea, type WithoutChild } from 'bits-ui'

  type ScrollableProps = Omit<WithoutChild<ScrollArea.RootProps>, 'class'>

  let { ref = $bindable(null), children, ...restProps }: ScrollableProps = $props()

  const ANIMATION_DURATION: number = 100
</script>

<!-- TODO: Change animations to use tw-animate-css -->

<div class="w-full h-full" in:fade={{ duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1.5 }} out:fade={{ duration: ANIMATION_DURATION }}>
  <ScrollArea.Root bind:ref type="always" class="w-full h-full" {...restProps}>
    <ScrollArea.Viewport class="w-full h-full p-2">
      {@render children?.()}
    </ScrollArea.Viewport>

    <ScrollArea.Scrollbar orientation="vertical" class="w-1.5 flex p-px transition-[width] duration-200">
      <ScrollArea.Thumb class={['flex-1 rounded-full transition-[background] duration-200', 't-dark:bg-zinc-750', 't-light:bg-zinc-300', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
</div>
