<script lang="ts" module>
  import { type Snippet } from 'svelte'

  export const GRID_CONTAINER_COLUMN_CLASSES = {
    1: ['grid-cols-1'],
    2: ['grid-cols-1 @7xl:grid-cols-2'],
    3: ['grid-cols-1 @5xl:grid-cols-2 @7xl:grid-cols-3'],
    4: ['grid-cols-1 @3xl:grid-cols-2 @5xl:grid-cols-3 @7xl:grid-cols-4'],
    5: ['grid-cols-1 @xl:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4 @7xl:grid-cols-5'],
    6: ['grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-5 @7xl:grid-cols-6'],
    7: ['grid-cols-1 @xs:grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 @3xl:grid-cols-5 @5xl:grid-cols-6 @7xl:grid-cols-7']
  } as const

  export type GridContainerColumnTypes = keyof typeof GRID_CONTAINER_COLUMN_CLASSES

  export const GRID_CONTAINER_HEIGHT_CLASSES = {
    fit: ['h-fit'],
    full: ['h-full'],
    'flex-1': ['flex-1']
  } as const

  export type GridContainerHeightTypes = keyof typeof GRID_CONTAINER_HEIGHT_CLASSES

  export const GRID_CONTAINER_WIDTH_CLASSES = {
    fit: ['w-fit'],
    full: ['w-full'],
    'flex-1': ['flex-1']
  } as const

  export type GridContainerWidthTypes = keyof typeof GRID_CONTAINER_WIDTH_CLASSES

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

  export type GridContainerRoundedTypes = keyof typeof GRID_CONTAINER_ROUNDED_CLASSES

  export const GRID_CONTAINER_MODE_CLASSES = {
    transparent: [],
    neutral: ['inset-ring-2', 'bg-zinc-800/50 inset-ring-zinc-800 ring-zinc-800', 't-light:bg-zinc-300/50 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'],
    info: [
      'inset-ring-2',
      'text-blue-500 bg-blue-800/30 inset-ring-blue-800 ring-blue-800',
      't-light:text-blue-500 t-light:bg-blue-300/30 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'inset-ring-2',
      'text-green-500 bg-green-800/30 inset-ring-green-800 ring-green-800',
      't-light:text-green-500 t-light:bg-green-300/30 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'inset-ring-2',
      'text-yellow-500 bg-yellow-800/30 inset-ring-yellow-800 ring-yellow-800',
      't-light:text-yellow-500 t-light:bg-yellow-300/30 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'inset-ring-2',
      'text-red-500 bg-red-800/30 inset-ring-red-800 ring-red-800',
      't-light:text-red-500 t-light:bg-red-300/30 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export type GridContainerModeTypes = keyof typeof GRID_CONTAINER_MODE_CLASSES

  export type GridContainerProps = {
    children: Snippet
    columns?: GridContainerColumnTypes | undefined
    height?: GridContainerHeightTypes | undefined
    width?: GridContainerWidthTypes | undefined
    gap?: GridContainerGapTypes | undefined
    padding?: GridContainerPaddingTypes | undefined
    rounded?: GridContainerRoundedTypes | undefined
    mode?: GridContainerModeTypes | undefined
    overflowHidden?: boolean | undefined
    isBreakpoint?: boolean | undefined
  }
</script>

<script lang="ts">
  let {
    children,
    columns = 1,
    height = 'fit',
    width = 'full',
    gap = 'base',
    padding = 'none',
    rounded = 'base',
    mode = 'transparent',
    overflowHidden = false,
    isBreakpoint = false
  }: GridContainerProps = $props()
</script>

<div
  class={[
    'grid',
    overflowHidden && 'overflow-hidden',
    isBreakpoint && '@container',
    ...GRID_CONTAINER_COLUMN_CLASSES[columns],
    ...GRID_CONTAINER_HEIGHT_CLASSES[height],
    ...GRID_CONTAINER_WIDTH_CLASSES[width],
    ...GRID_CONTAINER_GAP_CLASSES[gap],
    ...GRID_CONTAINER_PADDING_CLASSES[padding],
    ...GRID_CONTAINER_ROUNDED_CLASSES[rounded],
    ...GRID_CONTAINER_MODE_CLASSES[mode]
  ]}
>
  {@render children()}
</div>
