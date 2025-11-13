<script lang="ts">
  import { type Snippet } from 'svelte'

  const COLUMN_CLASSES = {
    1: ['grid-cols-1'],
    2: ['grid-cols-1 @3xl:grid-cols-2'],
    3: ['grid-cols-1 @2xl:grid-cols-2 @6xl:grid-cols-3'],
    4: ['grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @8xl:grid-cols-4'],
    5: ['grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 @9xl:grid-cols-5'],
    6: ['grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-6'],
    7: ['grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-6 @9xl:grid-cols-7']
  } as const

  type ColumnTypes = keyof typeof COLUMN_CLASSES

  type GridContainer = {
    children: Snippet
    columns?: ColumnTypes | undefined
    breakpoint?: boolean | undefined
  }

  let { children, columns = 1, breakpoint = false }: GridContainer = $props()
</script>

<div class={['w-full', breakpoint && '@container']}>
  <div class={['w-full grid gap-2', ...COLUMN_CLASSES[columns]]}>
    {@render children()}
  </div>
</div>
