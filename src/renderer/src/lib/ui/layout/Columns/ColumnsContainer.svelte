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

  type ColumnsContainerProps = {
    children: Snippet
    columns?: ColumnTypes | undefined
    isBreakpoint?: boolean | undefined
    isLayout?: boolean | undefined
  }

  let { children, columns = 1, isBreakpoint = false, isLayout = false }: ColumnsContainerProps = $props()
</script>

<div class={['w-full', isBreakpoint && '@container']}>
  <div class={['w-full', isLayout ? 'gap-x-8 space-y-8' : 'gap-x-4 space-y-4', ...COLUMN_CLASSES[columns]]}>
    {@render children()}
  </div>
</div>
