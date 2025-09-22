<script lang="ts">
  import { Button } from 'bits-ui'

  import { type Snippet } from 'svelte'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const
  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  type ButtonNeutralPropsType = Button.RootProps & {
    children: Snippet<[]>
    rounded?: RoundedTypes | undefined
    mode?: 'text' | 'icon' | 'wrapper' | undefined
  }

  let { children, rounded = 'regular', mode = 'text', ...restProps }: ButtonNeutralPropsType = $props()
</script>

<Button.Root
  class={[
    'w-fit flex items-center justify-center enabled:cursor-pointer disabled:opacity-50 border transition-[opacity,border,background-color] duration-200',
    't-dark:bg-zinc-800 t-dark:border-zinc-750',
    't-light:bg-zinc-200 t-light:border-zinc-250',
    't-rust:bg-rust-800 t-rust:border-rust-750',
    't-midnight:bg-gray-800 t-midnight:border-gray-750',
    mode === 'text' && 'px-2 py-1',
    mode === 'icon' && 'p-1',
    mode === 'wrapper' && 'p-0',
    ...ROUNDED_CLASSES[rounded]
  ]}
  {...restProps}
>
  {@render children()}
</Button.Root>
