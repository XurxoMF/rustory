<script lang="ts">
  import { type Snippet } from 'svelte'

  type GridContainer = {
    children: Snippet<[]>
    columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | undefined
    overflow?: 'auto' | 'hidden' | undefined
  }

  let { children, columns = 1, gap = 3, overflow = 'auto' }: GridContainer = $props()
</script>

<div class="w-full @container">
  <div
    class={[
      'w-full grid grid-cols-1',
      columns === 2 && '@3xl:grid-cols-2',
      columns === 3 && '@2xl:grid-cols-2 @6xl:grid-cols-3',
      columns === 4 && '@xl:grid-cols-2 @4xl:grid-cols-3 @8xl:grid-cols-4',
      columns === 5 && '@lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 @9xl:grid-cols-5',
      columns === 6 && '@md:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @8xl:grid-cols-6',
      columns === 7 && '@sm:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 @6xl:grid-cols-5 @9xl:grid-cols-7',
      gap === 1 && 'gap-1',
      gap === 2 && 'gap-2',
      gap === 3 && 'gap-3',
      gap === 4 && 'gap-4',
      gap === 5 && 'gap-5',
      gap === 6 && 'gap-6',
      gap === 7 && 'gap-7',
      gap === 8 && 'gap-8',
      overflow === 'auto' && 'overflow-auto',
      overflow === 'hidden' && 'overflow-hidden'
    ]}
  >
    {@render children()}
  </div>
</div>
