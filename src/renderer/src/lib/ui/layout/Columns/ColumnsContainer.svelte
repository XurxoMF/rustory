<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const COLUMNS_CONTAINER_COLUMN_CLASSES = {
    1: ['columns-1'],
    2: ['columns-1 @3xl:columns-2'],
    3: ['columns-1 @2xl:columns-2 @6xl:columns-3'],
    4: ['columns-1 @xl:columns-2 @4xl:columns-3 @8xl:columns-4'],
    5: ['columns-1 @lg:columns-2 @3xl:columns-3 @6xl:columns-4 @9xl:columns-5'],
    6: ['columns-1 @sm:columns-2 @2xl:columns-3 @4xl:columns-4 @6xl:columns-6'],
    7: ['columns-1 @sm:columns-2 @2xl:columns-3 @4xl:columns-4 @6xl:columns-6 @9xl:columns-7']
  } as const

  export type ColumnsContainerColumnTypes = keyof typeof COLUMNS_CONTAINER_COLUMN_CLASSES

  export const COLUMNS_CONTAINER_HEIGHT_CLASSES = {
    fit: ['h-fit'],
    full: ['h-full'],
    'flex-1': ['flex-1']
  } as const

  export type ColumnsContainerHeightClasses = keyof typeof COLUMNS_CONTAINER_HEIGHT_CLASSES

  export const COLUMNS_CONTAINER_WIDTH_CLASSES = {
    fit: ['w-fit'],
    full: ['w-full'],
    'flex-1': ['flex-1']
  } as const

  export type ColumnsContainerWidthClasses = keyof typeof COLUMNS_CONTAINER_WIDTH_CLASSES

  export const COLUMNS_CONTAINER_COLUMNS_CLASSES = {
    none: ['gap-x-0 space-y-0'],
    xs: ['gap-x-1 space-y-1'],
    sm: ['gap-x-2 space-y-2'],
    base: ['gap-x-4 space-y-4'],
    lg: ['gap-x-6 space-y-6'],
    xl: ['gap-x-8 space-y-8']
  } as const

  export type ColumnsContainerGapTypes = keyof typeof COLUMNS_CONTAINER_COLUMNS_CLASSES

  export const COLUMNS_CONTAINER_PADDING_CLASSES = {
    none: ['p-0'],
    xs: ['p-1'],
    sm: ['p-2'],
    base: ['p-4'],
    lg: ['p-6'],
    xl: ['p-8']
  } as const

  export type ColumnsContainerPaddingTypes = keyof typeof COLUMNS_CONTAINER_PADDING_CLASSES

  export const COLUMNS_CONTAINER_ROUNDED_CLASSES = {
    none: ['rounded-none'],
    xs: ['rounded-xs'],
    sm: ['rounded-sm'],
    base: ['rounded-md'],
    lg: ['rounded-lg'],
    xl: ['rounded-xl']
  } as const

  export type ColumnsContainerRoundedClasses = keyof typeof COLUMNS_CONTAINER_ROUNDED_CLASSES

  export const COLUMNS_CONTAINER_MODE_CLASSES = {
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

  export type ColumnsContainerModeTypes = keyof typeof COLUMNS_CONTAINER_MODE_CLASSES

  export type ColumnsContainerProps = WithoutKeys<HTMLAttributes<HTMLDivElement>, 'class'> & {
    columns?: ColumnsContainerColumnTypes | undefined
    height?: ColumnsContainerHeightClasses | undefined
    width?: ColumnsContainerWidthClasses | undefined
    gap?: ColumnsContainerGapTypes | undefined
    padding?: ColumnsContainerPaddingTypes | undefined
    rounded?: ColumnsContainerRoundedClasses | undefined
    mode?: ColumnsContainerModeTypes | undefined
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
    isBreakpoint = false,
    ...restProps
  }: ColumnsContainerProps = $props()
</script>

<div
  class={[
    overflowHidden && 'overflow-hidden',
    isBreakpoint && '@container',
    ...COLUMNS_CONTAINER_COLUMN_CLASSES[columns],
    ...COLUMNS_CONTAINER_HEIGHT_CLASSES[height],
    ...COLUMNS_CONTAINER_WIDTH_CLASSES[width],
    ...COLUMNS_CONTAINER_COLUMNS_CLASSES[gap],
    ...COLUMNS_CONTAINER_PADDING_CLASSES[padding],
    ...COLUMNS_CONTAINER_ROUNDED_CLASSES[rounded],
    ...COLUMNS_CONTAINER_MODE_CLASSES[mode]
  ]}
  {...restProps}
>
  {@render children?.()}
</div>
