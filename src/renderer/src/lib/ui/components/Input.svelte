<script lang="ts" module>
  import { type WithoutChildren } from 'bits-ui'
  import { type HTMLInputAttributes } from 'svelte/elements'

  export type InputTypes = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url'

  export const INPUT_MODE_CLASSES = {
    neutral: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
    ],
    info: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-blue-500 not-disabled:hover:text-blue-200 bg-blue-800/30 not-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-green-500 not-disabled:hover:text-green-200 bg-green-800/30 not-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-yellow-500 not-disabled:hover:text-yellow-200 bg-yellow-800/30 not-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-red-500 not-disabled:hover:text-red-200 bg-red-800/30 not-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800'
    ]
  } as const

  export type InputModeTypes = keyof typeof INPUT_MODE_CLASSES

  export const WIDTH_CLASSES = {
    fit: ['w-fit'],
    full: ['w-full'],
    'flex-1': ['flex-1']
  } as const

  export type InputWidthClasses = keyof typeof WIDTH_CLASSES

  export type InputProps = Omit<WithoutChildren<HTMLInputAttributes>, 'class' | 'type'> & {
    type: InputTypes
    mode?: InputModeTypes | undefined
    width?: InputWidthClasses | undefined
  }
</script>

<script lang="ts">
  let { value = $bindable(), mode = 'neutral', width = 'full', readonly, tabindex, ...restProps }: InputProps = $props()
</script>

<input
  bind:value
  {readonly}
  tabindex={readonly ? -1 : tabindex}
  class={[
    'w-full min-w-9 min-h-9 flex items-center justify-between gap-2 p-2 leading-tight rounded-sm outline-none transition-all',
    'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
    'disabled:opacity-40',
    ...INPUT_MODE_CLASSES[mode],
    ...WIDTH_CLASSES[width]
  ]}
  {...restProps}
/>
