<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export const FLEX_CONTAINER_DIRECTION_CLASSES = {
    col: ['flex-col'],
    row: ['flex-row']
  } as const

  export type FlexContainerDirectionClasses = keyof typeof FLEX_CONTAINER_DIRECTION_CLASSES

  export type FlexContainerAlignments = 'start' | 'center' | 'end' | 'between' | 'arround'

  export const FLEX_CONTAINER_JUSTIFY_CLASSES: Record<FlexContainerAlignments, string[]> = {
    start: ['justify-start'],
    center: ['justify-center'],
    end: ['justify-end'],
    between: ['justify-between'],
    arround: ['justify-around']
  } as const

  export const FLEX_CONTAINER_ALIGN_CLASSES: Record<FlexContainerAlignments, string[]> = {
    start: ['items-start'],
    center: ['items-center'],
    end: ['items-end'],
    between: [],
    arround: []
  } as const

  export const FLEX_CONTAINER_HEIGHT_CLASSES = {
    fit: ['h-fit'],
    full: ['h-full'],
    'flex-1': ['flex-1']
  } as const

  export type FlexContainerHeightClasses = keyof typeof FLEX_CONTAINER_HEIGHT_CLASSES

  export const FLEX_CONTAINER_WIDTH_CLASSES = {
    fit: ['w-fit'],
    full: ['w-full'],
    'flex-1': ['flex-1']
  } as const

  export type FlexContainerWidthClasses = keyof typeof FLEX_CONTAINER_WIDTH_CLASSES

  export const FLEX_CONTAINER_GAP_CLASSES = {
    none: ['gap-0'],
    xs: ['gap-1'],
    sm: ['gap-2'],
    base: ['gap-4'],
    lg: ['gap-6'],
    xl: ['gap-8']
  } as const

  export type FlexContainerGapTypes = keyof typeof FLEX_CONTAINER_GAP_CLASSES

  export const FLEX_CONTAINER_PADDING_CLASSES = {
    none: ['p-0'],
    xs: ['p-1'],
    sm: ['p-2'],
    base: ['p-4'],
    lg: ['p-6'],
    xl: ['p-8']
  } as const

  export type FlexContainerPaddingTypes = keyof typeof FLEX_CONTAINER_PADDING_CLASSES

  export const FLEX_CONTAINER_ROUNDED_CLASSES = {
    none: ['rounded-none'],
    xs: ['rounded-xs'],
    sm: ['rounded-sm'],
    base: ['rounded-md'],
    lg: ['rounded-lg'],
    xl: ['rounded-xl']
  } as const

  export type FlexContainerRoundedClasses = keyof typeof FLEX_CONTAINER_ROUNDED_CLASSES

  export const FLEX_CONTAINER_MODE_CLASSES = {
    transparent: [],
    neutral: ['inset-ring-2', 'bg-zinc-800/50 inset-ring-zinc-800 ring-zinc-800'],
    info: ['inset-ring-2', 'text-blue-500 bg-blue-800/30 inset-ring-blue-800 ring-blue-800'],
    success: ['inset-ring-2', 'text-green-500 bg-green-800/30 inset-ring-green-800 ring-green-800'],
    warning: ['inset-ring-2', 'text-yellow-500 bg-yellow-800/30 inset-ring-yellow-800 ring-yellow-800'],
    danger: ['inset-ring-2', 'text-red-500 bg-red-800/30 inset-ring-red-800 ring-red-800']
  } as const

  export type FlexContainerModeTypes = keyof typeof FLEX_CONTAINER_MODE_CLASSES

  export type FlexContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    direction?: FlexContainerDirectionClasses | undefined
    /**
     * Take in account that *between* and *arround* are only valid for *row* direction.
     */
    alignX?: FlexContainerAlignments | undefined
    /**
     * Take in account that *between* and *arround* are only valid for *column* direction.
     */
    alignY?: FlexContainerAlignments | undefined
    gap?: FlexContainerGapTypes | undefined
    padding?: FlexContainerPaddingTypes | undefined
    rounded?: FlexContainerRoundedClasses | undefined
    height?: FlexContainerHeightClasses | undefined
    width?: FlexContainerWidthClasses | undefined
    mode?: FlexContainerModeTypes | undefined
    overflowHidden?: boolean | undefined
    isBreakpoint?: boolean | undefined
  }
</script>

<script lang="ts">
  let {
    direction = 'row',
    alignX = 'start',
    alignY = 'center',
    gap = 'base',
    padding = 'none',
    rounded = 'base',
    height = 'fit',
    width = 'full',
    mode = 'transparent',
    overflowHidden = false,
    isBreakpoint = false,
    children,
    ...restProps
  }: FlexContainerProps = $props()
</script>

<div
  class={[
    'flex',
    overflowHidden && 'overflow-hidden',
    isBreakpoint && '@container',
    ...FLEX_CONTAINER_DIRECTION_CLASSES[direction],
    ...FLEX_CONTAINER_HEIGHT_CLASSES[height],
    ...FLEX_CONTAINER_WIDTH_CLASSES[width],
    ...FLEX_CONTAINER_ALIGN_CLASSES[direction === 'row' ? alignY : alignX],
    ...FLEX_CONTAINER_JUSTIFY_CLASSES[direction === 'row' ? alignX : alignY],
    ...FLEX_CONTAINER_GAP_CLASSES[gap],
    ...FLEX_CONTAINER_PADDING_CLASSES[padding],
    ...FLEX_CONTAINER_ROUNDED_CLASSES[rounded],

    ...FLEX_CONTAINER_MODE_CLASSES[mode]
  ]}
  {...restProps}
>
  {@render children?.()}
</div>
