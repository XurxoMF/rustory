<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const

  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  type ButtonNeutralProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    rounded?: RoundedTypes | undefined
    mode?: 'text' | 'icon' | 'wrapper' | undefined
  }

  let { children, rounded = 'regular', mode = 'text', ...restProps }: ButtonNeutralProps = $props()
</script>

<button
  class={[
    'w-fit flex items-center justify-center border transition-[opacity,border,background-color] duration-200',
    'focus:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    mode === 'text' && 'px-2 py-1',
    mode === 'icon' && 'p-1',
    mode === 'wrapper' && 'p-0 text-start',
    't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
    't-light:bg-zinc-200 t-light:border-zinc-250 t-light:focus:border-zinc-250',
    't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus:border-rust-750',
    't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus:border-gray-750',
    ...ROUNDED_CLASSES[rounded]
  ]}
  {...restProps}
>
  {@render children()}
</button>
