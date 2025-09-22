<script lang="ts">
  import { Button } from 'bits-ui'

  import { type Snippet } from 'svelte'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const
  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  type ButtonSuccessPropsType = Button.RootProps & {
    children: Snippet<[]>
    rounded?: RoundedTypes | undefined
    mode?: 'text' | 'icon' | 'wrapper' | undefined
  }

  let { children, rounded = 'regular', mode = 'text', ...restProps }: ButtonSuccessPropsType = $props()
</script>

<Button.Root
  class={[
    'w-fit flex items-center justify-center enabled:cursor-pointer px-2 py-1 disabled:opacity-50 border border-green-600 bg-green-700 transition-[opacity,border] duration-200',
    mode === 'text' && 'px-2 py-1',
    mode === 'icon' && 'p-1',
    mode === 'wrapper' && 'p-0',
    ...ROUNDED_CLASSES[rounded]
  ]}
  {...restProps}
>
  {@render children()}
</Button.Root>
