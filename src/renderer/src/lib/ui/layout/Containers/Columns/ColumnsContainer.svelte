<script lang="ts">
  import { type Snippet } from 'svelte'

  const COLUMN_CLASSES = {
    1: ['columns-1'],
    2: ['columns-1 @3xl:columns-2'],
    3: ['columns-1 @2xl:columns-2 @6xl:columns-3'],
    4: ['columns-1 @xl:columns-2 @4xl:columns-3 @8xl:columns-4'],
    5: ['columns-1 @lg:columns-2 @3xl:columns-3 @6xl:columns-4 @9xl:columns-5'],
    6: ['columns-1 @sm:columns-2 @2xl:columns-3 @4xl:columns-4 @6xl:columns-6'],
    7: ['columns-1 @sm:columns-2 @2xl:columns-3 @4xl:columns-4 @6xl:columns-6 @9xl:columns-7']
  } as const

  type ColumnTypes = keyof typeof COLUMN_CLASSES

  const GAP_CLASSES = {
    1: ['gap-x-1 space-y-1'],
    2: ['gap-x-2 space-y-2'],
    3: ['gap-x-3 space-y-3'],
    4: ['gap-x-4 space-y-4'],
    5: ['gap-x-5 space-y-5'],
    6: ['gap-x-6 space-y-6'],
    7: ['gap-x-7 space-y-7'],
    8: ['gap-x-8 space-y-8']
  } as const

  type GapTypes = keyof typeof GAP_CLASSES

  type ColumnsContainerProps = {
    children: Snippet
    columns?: ColumnTypes | undefined
    gap?: GapTypes | undefined
    breakpoint?: boolean | undefined
  }

  let { children, columns = 1, gap = 3, breakpoint = false }: ColumnsContainerProps = $props()
</script>

<div class={['w-full', breakpoint && '@container']}>
  <div class={['w-full', ...COLUMN_CLASSES[columns], ...GAP_CLASSES[gap]]}>
    {@render children()}
  </div>
</div>
