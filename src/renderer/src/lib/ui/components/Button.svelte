<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const MODE_CLASSES = {
    transparent: [
      't-dark:not-disabled:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-750',
      't-light:not-disabled:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
      't-rust:not-disabled:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
      't-midnight:not-disabled:hover:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
    ],
    neutral: [
      'shadow/20',
      't-dark:bg-zinc-800 t-dark:focus-visible:outline-zinc-750',
      't-light:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
      't-rust:bg-rust-800 t-rust:focus-visible:outline-rust-750',
      't-midnight:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
    ],
    success: ['shadow/20', 'bg-green-700 text-zinc-100 focus-visible:outline-green-500'],
    warning: ['shadow/20', 'bg-yellow-600 text-zinc-100 focus-visible:outline-yellow-400'],
    danger: ['shadow/20', 'bg-red-800 text-zinc-100 focus-visible:outline-red-600']
  } as const

  type ModeTypes = keyof typeof MODE_CLASSES

  const SIZE_CLASSES = {
    'fit-fit': ['w-fit h-fit'],
    'fit-form': ['w-fit h-9'],
    'full-form': ['w-full h-9'],
    'form-form': ['w-9 h-9']
  } as const

  type SizeTypes = keyof typeof SIZE_CLASSES

  type ButtonProps = Omit<HTMLButtonAttributes, 'class'> & {
    mode?: ModeTypes | undefined
    size?: SizeTypes | undefined
  }

  let { mode = 'transparent', size = 'fit-fit', children, ...restProps }: ButtonProps = $props()
</script>

<button
  class={[
    'flex items-center justify-center rounded-md shrink-0 transition-[opacity,background-color] duration-200',
    'focus-visible:outline-2',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    ...MODE_CLASSES[mode],
    ...SIZE_CLASSES[size]
  ]}
  {...restProps}
>
  {@render children?.()}
</button>
