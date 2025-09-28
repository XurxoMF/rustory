<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const

  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  type ButtonProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    rounded?: RoundedTypes | undefined
    mode?: 'text' | 'icon' | 'wrapper' | 'container' | undefined
  }

  let { children, rounded = 'regular', mode = 'text', ...restProps }: ButtonProps = $props()
</script>

<button
  class={[
    mode === 'container' ? 'w-full p-0 text-start' : 'w-fit',
    'flex items-center justify-center transition-[opacity] duration-200',
    'focus:outline-2',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    mode === 'text' && 'px-2 py-1',
    mode === 'icon' && 'p-1',
    mode === 'wrapper' && 'p-0 text-start',
    't-dark:focus:outline-zinc-750',
    't-light:focus:border-zinc-250',
    't-rust:focus:border-rust-750',
    't-midnight:focus:border-gray-750',
    ...ROUNDED_CLASSES[rounded]
  ]}
  {...restProps}
>
  {@render children()}
</button>
