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

  type ButtonSuccessProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    rounded?: RoundedTypes | undefined
    size?: SizeTypes | undefined
    padding?: PaddingTypes | undefined
  }

  let { children, rounded = 'regular', size = 'regular', padding = 'text', ...restProps }: ButtonSuccessProps = $props()
</script>

<button
  class={[
    'flex items-center justify-center shrink-0 border transition-[opacity,border] duration-200',
    'focus:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'border-green-500 bg-green-700 text-zinc-150 focus:outline-green-500',
    ...ROUNDED_CLASSES[rounded],
    ...SIZE_CLASSES[size],
    ...PADDING_CLASSES[padding]
  ]}
  {...restProps}
>
  {@render children()}
</button>
