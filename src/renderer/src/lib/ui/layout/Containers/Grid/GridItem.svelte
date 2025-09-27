<script lang="ts">
  import { type Snippet } from 'svelte'

  type GridItem = {
    children: Snippet
    spanX?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'full' | undefined
    spanY?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 'full' | undefined
  }

  let { children, spanX = 1, spanY = 1 }: GridItem = $props()
</script>

<div
  class={[
    'w-full',
    spanX === 2 && 'col-span-2',
    spanX === 3 && 'col-span-3',
    spanX === 4 && 'col-span-4',
    spanX === 5 && 'col-span-5',
    spanX === 6 && 'col-span-6',
    spanX === 7 && 'col-span-7',
    spanX === 'full' && 'col-span-full',
    spanY === 2 && 'row-span-2',
    spanY === 3 && 'row-span-3',
    spanY === 4 && 'row-span-4',
    spanY === 5 && 'row-span-5',
    spanY === 6 && 'row-span-6',
    spanY === 7 && 'row-span-7',
    spanY === 'full' && 'row-span-full'
  ]}
>
  {@render children()}
</div>
