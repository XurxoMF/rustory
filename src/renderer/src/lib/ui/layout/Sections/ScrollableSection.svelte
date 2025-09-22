<script lang="ts">
  import { type Snippet } from 'svelte'

  import ScrollableContainer from '@renderer/lib/ui/layout/ScrollableContainer.svelte'

  type ScrollableSectionPropsType = {
    orientation: 'vertical' | 'horizontal' | 'both'
    isContainer?: boolean | undefined
    children: Snippet<[]>
  }

  let { orientation, isContainer = false, children }: ScrollableSectionPropsType = $props()
</script>

<ScrollableContainer
  {orientation}
  class={[
    'w-full h-full overflow-hidden rounded-md border transition-[border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-zinc-750',
    't-light:bg-zinc-150 t-light:border-zinc-250',
    't-rust:bg-rust-850 t-rust:border-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-gray-750',
    isContainer && '@container'
  ]}
  viewportClasses="w-full h-full"
>
  {@render children()}
</ScrollableContainer>
