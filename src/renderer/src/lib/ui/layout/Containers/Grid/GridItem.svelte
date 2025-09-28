<script lang="ts">
  import { type Snippet } from 'svelte'

  const SPANX_CLASSES = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    full: 'col-span-full'
  } as const

  type SpanXTypes = keyof typeof SPANX_CLASSES

  const SPANY_CLASSES = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
    5: 'row-span-5',
    6: 'row-span-6',
    7: 'row-span-7',
    full: 'row-span-full'
  } as const

  type SpanYTypes = keyof typeof SPANY_CLASSES

  type GridItem = {
    children: Snippet
    spanX?: SpanXTypes | undefined
    spanY?: SpanYTypes | undefined
  }

  let { children, spanX = 1, spanY = 1 }: GridItem = $props()
</script>

<div class={['w-full', ...SPANX_CLASSES[spanX], ...SPANY_CLASSES[spanY]]}>
  {@render children()}
</div>
