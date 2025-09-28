<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const

  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  type ButtonSuccessProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    rounded?: RoundedTypes | undefined
    mode?: 'text' | 'icon' | 'wrapper' | undefined
  }

  let { children, rounded = 'regular', mode = 'text', ...restProps }: ButtonSuccessProps = $props()
</script>

<button
  class={[
    'w-fit flex items-center justify-center border transition-[opacity,border] duration-200',
    'focus:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    mode === 'text' && 'px-2 py-1',
    mode === 'icon' && 'p-1',
    mode === 'wrapper' && 'p-0 text-start',
    'border-green-500 bg-green-700 focus:outline-green-500',
    ...ROUNDED_CLASSES[rounded]
  ]}
  {...restProps}
>
  {@render children()}
</button>
