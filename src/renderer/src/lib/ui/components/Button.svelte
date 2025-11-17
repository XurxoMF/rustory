<script lang="ts" module>
  import type { HTMLButtonAttributes } from 'svelte/elements'

  export const BUTTON_MODE_CLASSES = {
    transparent: ['focus-visible:inset-ring-1 focus-visible:ring-2', 'not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'],
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-disabled:hover:text-blue-200 bg-blue-800/30 not-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-disabled:hover:text-green-200 bg-green-800/30 not-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-disabled:hover:text-yellow-200 bg-yellow-800/30 not-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-disabled:hover:text-red-200 bg-red-800/30 not-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800'
    ]
  } as const

  export type ButtonModeTypes = keyof typeof BUTTON_MODE_CLASSES

  export const BUTTON_HEIGHT_CLASSES = {
    fit: ['h-fit'],
    full: ['h-full'],
    'flex-1': ['flex-1']
  } as const

  export type ButtonHeightClasses = keyof typeof BUTTON_HEIGHT_CLASSES

  export const BUTTON_WIDTH_CLASSES = {
    fit: ['w-fit'],
    full: ['w-full'],
    'flex-1': ['flex-1']
  } as const

  export type ButtonWidthClasses = keyof typeof BUTTON_WIDTH_CLASSES

  export const BUTTON_PADDING_CLASSES = {
    none: ['p-0'],
    xs: ['p-1'],
    sm: ['p-2'],
    base: ['p-4'],
    lg: ['p-6'],
    xl: ['p-8']
  } as const

  export type ButtonPaddingTypes = keyof typeof BUTTON_PADDING_CLASSES

  export const BUTTON_ROUNDED_CLASSES = {
    none: ['rounded-none'],
    xs: ['rounded-xs'],
    sm: ['rounded-sm'],
    base: ['rounded-md'],
    lg: ['rounded-lg'],
    xl: ['rounded-xl']
  } as const

  export type ButtonRoundedClasses = keyof typeof BUTTON_ROUNDED_CLASSES

  export const BUTTON_ALIGN_CLASSES = {
    start: ['justify-start'],
    center: ['justify-center'],
    end: ['justify-end']
  } as const

  export type ButtonAlignClasses = keyof typeof BUTTON_ALIGN_CLASSES

  export type ButtonProps = WithoutKeys<HTMLButtonAttributes, 'class'> & {
    mode?: ButtonModeTypes | undefined
    height?: ButtonHeightClasses | undefined
    width?: ButtonWidthClasses | undefined
    padding?: ButtonPaddingTypes | undefined
    rounded?: ButtonRoundedClasses | undefined
    align?: ButtonAlignClasses | undefined
  }
</script>

<script lang="ts">
  let { mode = 'neutral', height = 'fit', width = 'fit', padding = 'sm', rounded = 'sm', align = 'center', children, ...restProps }: ButtonProps = $props()
</script>

<button
  class={[
    'shrink-0 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 font-medium leading-tight rounded-sm outline-none transition-colors',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    ...BUTTON_MODE_CLASSES[mode],
    ...BUTTON_HEIGHT_CLASSES[height],
    ...BUTTON_WIDTH_CLASSES[width],
    ...BUTTON_PADDING_CLASSES[padding],
    ...BUTTON_ROUNDED_CLASSES[rounded],
    ...BUTTON_ALIGN_CLASSES[align]
  ]}
  {...restProps}
>
  {@render children?.()}
</button>
