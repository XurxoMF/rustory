<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const

  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  const PADDING_CLASSES = {
    text: ['px-2 py-1'],
    icon: ['p-1'],
    none: ['p-0']
  } as const

  type PaddingTypes = keyof typeof PADDING_CLASSES

  type ButtonNeutralProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    rounded?: RoundedTypes | undefined
    padding?: PaddingTypes | undefined
  }

  let { children, rounded = 'regular', padding = 'text', ...restProps }: ButtonNeutralProps = $props()
</script>

<button
  class={[
    'w-fit flex items-center justify-center border transition-[opacity,border,background-color] duration-200',
    'focus:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
    't-light:bg-zinc-200 t-light:border-zinc-250 t-light:focus:border-zinc-250',
    't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus:border-rust-750',
    't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus:border-gray-750',
    ...ROUNDED_CLASSES[rounded],
    ...PADDING_CLASSES[padding]
  ]}
  {...restProps}
>
  {@render children()}
</button>
