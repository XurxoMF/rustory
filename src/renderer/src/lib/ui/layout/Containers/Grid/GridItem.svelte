<script lang="ts">
  import { type Snippet } from 'svelte'

  const SPANX_CLASSES = {
    1: ['col-span-1'],
    2: ['col-span-2'],
    3: ['col-span-3'],
    4: ['col-span-4'],
    5: ['col-span-5'],
    6: ['col-span-6'],
    7: ['col-span-7'],
    full: ['col-span-full']
  } as const

  type SpanXTypes = keyof typeof SPANX_CLASSES

  type GridItem = {
    children: Snippet
    spanX?: SpanXTypes | undefined
  }

  let { children, spanX = 1 }: GridItem = $props()
</script>

<div class={['w-full', ...SPANX_CLASSES[spanX]]}>
  {@render children()}
</div>
