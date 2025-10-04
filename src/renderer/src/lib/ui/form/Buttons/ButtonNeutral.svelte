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

  type ButtonNeutralProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    rounded?: RoundedTypes | undefined
    size?: SizeTypes | undefined
    padding?: PaddingTypes | undefined
  }

  let { children, rounded = 'regular', size = 'regular', padding = 'text', ...restProps }: ButtonNeutralProps = $props()
</script>

<button
  class={[
    'flex items-center justify-center shrink-0 border transition-[opacity,border,background-color] duration-200',
    'focus-visible:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
    't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
    't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
    't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750',
    ...ROUNDED_CLASSES[rounded],
    ...SIZE_CLASSES[size],
    ...PADDING_CLASSES[padding]
  ]}
  {...restProps}
>
  {@render children()}
</button>
