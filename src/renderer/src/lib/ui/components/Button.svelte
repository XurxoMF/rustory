<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'

  const MODE_CLASSES = {
    transparent: ['focus-visible:inset-ring-1 focus-visible:ring-2', 't-dark:not-disabled:hover:bg-zinc-800 t-dark:inset-ring-zinc-800 t-dark:ring-zinc-800'],
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      't-dark:bg-zinc-800/30 t-dark:not-disabled:hover:bg-zinc-800 t-dark:inset-ring-zinc-800 t-dark:ring-zinc-800'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-disabled:hover:text-green-200 bg-green-800/30 not-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-400 not-disabled:hover:text-yellow-200 bg-yellow-800/30 not-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-600 not-disabled:hover:text-red-200 bg-red-800/30 not-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800'
    ]
  } as const

  type ModeTypes = keyof typeof MODE_CLASSES

  type ButtonProps = Omit<HTMLButtonAttributes, 'class'> & {
    mode?: ModeTypes | undefined
    width?: 'fit' | 'full' | undefined
    align?: 'left' | 'center' | 'right' | undefined
  }

  let { mode = 'transparent', width = 'fit', align = 'center', children, ...restProps }: ButtonProps = $props()
</script>

<button
  class={[
    'shrink-0 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 leading-tight rounded-sm outline-none transition-all duration-100',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    ...MODE_CLASSES[mode],
    width === 'fit' ? 'w-fit' : 'w-full',
    align === 'left' ? 'justify-start' : align === 'center' ? 'justify-center' : 'justify-end'
  ]}
  {...restProps}
>
  {@render children?.()}
</button>
