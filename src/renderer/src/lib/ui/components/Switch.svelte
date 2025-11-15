<script lang="ts">
  import { Switch, type WithoutChildrenOrChild } from 'bits-ui'

  type Modes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  const ROOT_MODE_CLASSES: Record<Modes, string[]> = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      't-dark:bg-zinc-800/50 t-dark:not-data-disabled:hover:bg-zinc-800 t-dark:inset-ring-zinc-800 t-dark:ring-zinc-800'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-blue-800/30 not-data-disabled:hover:bg-blue-800 t-dark:not-data-disabled:data-[state=checked]:bg-blue-800 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-green-800/30 not-data-disabled:hover:bg-green-800 t-dark:not-data-disabled:data-[state=checked]:bg-green-800 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-yellow-800/30 not-data-disabled:hover:bg-yellow-800 t-dark:not-data-disabled:data-[state=checked]:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 t-dark:not-data-disabled:data-[state=checked]:bg-red-800 focus-visible:ring-2',
      'bg-red-800/30 not-data-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800'
    ]
  } as const

  const THUMB_MODE_CLASSES: Record<Modes, string[]> = {
    neutral: ['t-dark:bg-zinc-200'],
    info: ['bg-blue-500 group-hover:bg-blue-200 group-not-data-disabled:group-data-[state=checked]:bg-blue-200'],
    success: ['bg-green-500 group-hover:bg-green-200 group-not-data-disabled:group-data-[state=checked]:bg-green-200'],
    warning: ['bg-yellow-500 group-hover:bg-yellow-200 group-not-data-disabled:group-data-[state=checked]:bg-yellow-200'],
    danger: ['bg-red-500 group-hover:bg-red-200 group-not-data-disabled:group-data-[state=checked]:bg-red-200']
  } as const

  type SwitchProps = Omit<WithoutChildrenOrChild<Switch.RootProps>, 'class'> & {
    mode?: Modes | undefined
    thumbProps?: Omit<WithoutChildrenOrChild<Switch.ThumbProps>, 'class'> | undefined
  }

  let { checked = $bindable(false), mode = 'neutral', thumbProps, ...restProps }: SwitchProps = $props()
</script>

<Switch.Root
  bind:checked
  class={[
    'group shrink-0 w-12 h-6 aspect-2/1 flex items-center p-1 rounded-full outline-none transition-all',
    'cursor-pointer data-disabled:cursor-not-allowed',
    'data-disabled:opacity-40',
    ...ROOT_MODE_CLASSES[mode]
  ]}
  {...restProps}
>
  <Switch.Thumb
    class={[
      'shrink-0 w-4 h-4 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 inline rounded-full outline-none transition-all',
      ...THUMB_MODE_CLASSES[mode]
    ]}
    {...thumbProps}
  />
</Switch.Root>
