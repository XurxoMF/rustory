<script lang="ts">
  import { type Snippet } from 'svelte'
  import { type HTMLButtonAttributes } from 'svelte/elements'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const
  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  type ButtonDnagerPropsType = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet<[]>
    rounded?: RoundedTypes | undefined
    icon?: boolean | undefined
  }

  let { children, rounded = 'regular', icon = false, ...restProps }: ButtonDnagerPropsType = $props()
</script>

<button
  class={[
    'w-fit flex items-center justify-center enabled:cursor-pointer disabled:opacity-50 border border-yellow-400 bg-yellow-500 transition-[opacity,border] duration-200',
    icon ? 'p-1' : 'px-2 py-1',
    ...ROUNDED_CLASSES[rounded]
  ]}
  {...restProps}
>
  {@render children()}
</button>
