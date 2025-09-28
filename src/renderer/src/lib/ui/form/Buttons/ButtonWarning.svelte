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

  type ButtonWarningProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    rounded?: RoundedTypes | undefined
    padding?: PaddingTypes | undefined
  }

  let { children, rounded = 'regular', padding = 'text', ...restProps }: ButtonWarningProps = $props()
</script>

<button
  class={[
    'w-fit flex items-center justify-center border transition-[opacity,border] duration-200',
    'focus:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'border-yellow-400 bg-yellow-600 focus:outline-yellow-400',
    ...ROUNDED_CLASSES[rounded],
    ...PADDING_CLASSES[padding]
  ]}
  {...restProps}
>
  {@render children()}
</button>
