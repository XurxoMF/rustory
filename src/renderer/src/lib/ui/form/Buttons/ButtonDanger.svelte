<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const
  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  type ButtonDangerProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet<[]>
    rounded?: RoundedTypes | undefined
    mode?: 'text' | 'icon' | 'wrapper' | undefined
  }

  let { children, rounded = 'regular', mode = 'text', ...restProps }: ButtonDangerProps = $props()
</script>

<button
  class={[
    'w-fit flex items-center justify-center enabled:cursor-pointer disabled:opacity-50 border border-red-700 bg-red-800 transition-[opacity,border] duration-200',
    mode === 'text' && 'px-2 py-1',
    mode === 'icon' && 'p-1',
    mode === 'wrapper' && 'p-0 text-start',
    ...ROUNDED_CLASSES[rounded]
  ]}
  {...restProps}
>
  {@render children()}
</button>
