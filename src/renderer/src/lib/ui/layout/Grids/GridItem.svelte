<script lang="ts">
  import { type Snippet } from 'svelte'

  type GridItemType = {
    children: Snippet<[]>
    spanX?: 1 | 2 | 3 | 4 | 5 | undefined
    spanY?: 1 | 2 | 3 | 4 | 5 | undefined
  }

  let { children, spanX = 1, spanY = 1 }: GridItemType = $props()
</script>

<div
  class={[
    'w-full h-full',
    spanX === 2 && 'col-span-2',
    spanX === 3 && 'col-span-3',
    spanX === 4 && 'col-span-4',
    spanX === 5 && 'col-span-5',
    spanY === 2 && 'row-span-2',
    spanY === 3 && 'row-span-3',
    spanY === 4 && 'row-span-4',
    spanY === 5 && 'row-span-5'
  ]}
>
  {@render children()}
</div>
