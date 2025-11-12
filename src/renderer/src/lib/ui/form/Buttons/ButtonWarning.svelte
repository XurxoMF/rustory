<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const

  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  const SIZE_CLASSES = {
    regular: ['h-9 w-fit'],
    square: ['h-9 w-9'],
    none: ['h-fit w-fit']
  } as const

  type SizeTypes = keyof typeof SIZE_CLASSES

  const PADDING_CLASSES = {
    text: ['px-2 py-1'],
    icon: ['p-1'],
    none: ['p-0']
  } as const

  type PaddingTypes = keyof typeof PADDING_CLASSES

  type ButtonWarningProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    rounded?: RoundedTypes | undefined
    size?: SizeTypes | undefined
    padding?: PaddingTypes | undefined
  }

  let { children, rounded = 'regular', size = 'regular', padding = 'text', ...restProps }: ButtonWarningProps = $props()
</script>

<button
  class={[
    'flex items-center justify-center shrink-0 shadow/20 transition-[opacity,background-color] duration-200',
    'focus-visible:outline-2',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    'bg-yellow-600 text-zinc-100 focus-visible:outline-yellow-400',
    ...ROUNDED_CLASSES[rounded],
    ...SIZE_CLASSES[size],
    ...PADDING_CLASSES[padding]
  ]}
  {...restProps}
>
  {@render children()}
</button>
