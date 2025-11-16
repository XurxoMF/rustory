<script lang="ts" module>
  import { type Snippet } from 'svelte'

  export const GLID_CONTAINER_COLUMN_CLASSES = {
    1: ['grid-cols-1'],
    2: ['grid-cols-1 @3xl:grid-cols-2'],
    3: ['grid-cols-1 @2xl:grid-cols-2 @6xl:grid-cols-3'],
    4: ['grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @8xl:grid-cols-4'],
    5: ['grid-cols-1 @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4 @9xl:grid-cols-5'],
    6: ['grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-6'],
    7: ['grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-3 @4xl:grid-cols-4 @6xl:grid-cols-6 @9xl:grid-cols-7']
  } as const

  export type GridContainerColumnTypes = keyof typeof GLID_CONTAINER_COLUMN_CLASSES

  export const GRID_CONTAINER_HEIGHT_CLASSES = {
    fit: ['h-fit'],
    full: ['h-full']
  } as const

  export type GridContainerHeightClasses = keyof typeof GRID_CONTAINER_HEIGHT_CLASSES

  export const GRID_CONTAINER_GAP_CLASSES = {
    none: ['gap-0'],
    xs: ['gap-1'],
    sm: ['gap-2'],
    base: ['gap-4'],
    lg: ['gap-6'],
    xl: ['gap-8']
  } as const

  export type GridContainerGapTypes = keyof typeof GRID_CONTAINER_GAP_CLASSES

  export const GRID_CONTAINER_PADDING_CLASSES = {
    none: ['p-0'],
    xs: ['p-1'],
    sm: ['p-2'],
    base: ['p-4'],
    lg: ['p-6'],
    xl: ['p-8']
  } as const

  export type GridContainerPaddingTypes = keyof typeof GRID_CONTAINER_PADDING_CLASSES

  export const GRID_CONTAINER_ROUNDED_CLASSES = {
    none: ['rounded-none'],
    xs: ['rounded-xs'],
    sm: ['rounded-sm'],
    base: ['rounded-md'],
    lg: ['rounded-lg'],
    xl: ['rounded-xl']
  } as const

  export type GridContainerRoundedClasses = keyof typeof GRID_CONTAINER_ROUNDED_CLASSES

  export const GRID_CONTAINER_MODE_CLASSES = {
    transparent: ['inset-ring-zinc-800 ring-zinc-800'],
    neutral: ['inset-ring-2', 'bg-zinc-800/50 inset-ring-zinc-800 ring-zinc-800'],
    info: ['inset-ring-2', 'text-blue-500 bg-blue-800/30 inset-ring-blue-800 ring-blue-800'],
    success: ['inset-ring-2', 'text-green-500 bg-green-800/30 inset-ring-green-800 ring-green-800'],
    warning: ['inset-ring-2', 'text-yellow-500 bg-yellow-800/30 inset-ring-yellow-800 ring-yellow-800'],
    danger: ['inset-ring-2', 'text-red-500 bg-red-800/30 inset-ring-red-800 ring-red-800']
  } as const

  export type GridContainerModeTypes = keyof typeof GRID_CONTAINER_MODE_CLASSES

  export type GridContainerProps = {
    children: Snippet
    columns?: GridContainerColumnTypes | undefined
    height?: GridContainerHeightClasses | undefined
    gap?: GridContainerGapTypes | undefined
    padding?: GridContainerPaddingTypes | undefined
    rounded?: GridContainerRoundedClasses | undefined
    mode?: GridContainerModeTypes | undefined
    isBreakpoint?: boolean | undefined
  }
</script>

<script lang="ts">
  let {
    children,
    columns = 1,
    height = 'fit',
    gap = 'base',
    padding = 'none',
    rounded = 'base',
    mode = 'transparent',
    isBreakpoint = false
  }: GridContainerProps = $props()
</script>

<div
  class={[
    'w-full',
    isBreakpoint && '@container',
    ...GRID_CONTAINER_HEIGHT_CLASSES[height],
    ...GRID_CONTAINER_MODE_CLASSES[mode],
    ...GRID_CONTAINER_ROUNDED_CLASSES[rounded]
  ]}
>
  <div
    class={[
      'w-full grid',
      ...GLID_CONTAINER_COLUMN_CLASSES[columns],
      ...GRID_CONTAINER_HEIGHT_CLASSES[height],
      ...GRID_CONTAINER_GAP_CLASSES[gap],
      ...GRID_CONTAINER_PADDING_CLASSES[padding]
    ]}
  >
    {@render children()}
  </div>
</div>
