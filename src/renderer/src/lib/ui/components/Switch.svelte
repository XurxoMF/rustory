<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export type SwitchModes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  export const SWITCH_ROOT_MODE_CLASSES: Record<SwitchModes, string[]> = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:bg-zinc-300/50 t-light:not-data-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-blue-800/30 not-data-disabled:hover:bg-blue-800 not-data-disabled:data-[state=checked]:bg-blue-800 inset-ring-blue-800 ring-blue-800',
      't-light:bg-blue-300/30 t-light:not-data-disabled:hover:bg-blue-300 t-light:not-data-disabled:data-[state=checked]:bg-blue-300 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-green-800/30 not-data-disabled:hover:bg-green-800 not-data-disabled:data-[state=checked]:bg-green-800 inset-ring-green-800 ring-green-800',
      't-light:bg-green-300/30 t-light:not-data-disabled:hover:bg-green-300 t-light:not-data-disabled:data-[state=checked]:bg-green-300 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-yellow-800/30 not-data-disabled:hover:bg-yellow-800 not-data-disabled:data-[state=checked]:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800',
      't-light:bg-yellow-300/30 t-light:not-data-disabled:hover:bg-yellow-300 t-light:not-data-disabled:data-[state=checked]:bg-yellow-300 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-red-800/30 not-data-disabled:hover:bg-red-800 not-data-disabled:data-[state=checked]:bg-red-800 inset-ring-red-800 ring-red-800',
      't-light:bg-red-300/30 t-light:not-data-disabled:hover:bg-red-300 t-light:not-data-disabled:data-[state=checked]:bg-red-300 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export const SWITCH_THUMB_MODE_CLASSES: Record<SwitchModes, string[]> = {
    neutral: ['bg-zinc-200', 't-light:bg-zinc-800'],
    info: [
      'bg-blue-500 group-hover:bg-blue-200 group-not-data-disabled:group-data-[state=checked]:bg-blue-200',
      't-light:bg-blue-500 t-light:group-hover:bg-blue-800 t-light:group-not-data-disabled:group-data-[state=checked]:bg-blue-800'
    ],
    success: [
      'bg-green-500 group-hover:bg-green-200 group-not-data-disabled:group-data-[state=checked]:bg-green-200',
      't-light:bg-green-500 t-light:group-hover:bg-green-800 t-light:group-not-data-disabled:group-data-[state=checked]:bg-green-800'
    ],
    warning: [
      'bg-yellow-500 group-hover:bg-yellow-200 group-not-data-disabled:group-data-[state=checked]:bg-yellow-200',
      't-light:bg-yellow-500 t-light:group-hover:bg-yellow-800 t-light:group-not-data-disabled:group-data-[state=checked]:bg-yellow-800'
    ],
    danger: [
      'bg-red-500 group-hover:bg-red-200 group-not-data-disabled:group-data-[state=checked]:bg-red-200',
      't-light:bg-red-500 t-light:group-hover:bg-red-800 t-light:group-not-data-disabled:group-data-[state=checked]:bg-red-800'
    ]
  } as const

  export type SwitchThumbRrops = WithoutKeys<WithoutChildrenOrChild<Switch.ThumbProps>, 'class'>

  export type SwitchProps = WithoutKeys<WithoutChildrenOrChild<Switch.RootProps>, 'class'> & {
    mode?: SwitchModes | undefined
    thumbProps?: SwitchThumbRrops | undefined
  }
</script>

<script lang="ts">
  import { Switch } from 'bits-ui'

  let { checked = $bindable(false), mode = 'neutral', thumbProps, ...restProps }: SwitchProps = $props()
</script>

<Switch.Root
  bind:checked
  class={[
    'group shrink-0 w-12 h-6 flex items-center p-1 rounded-full outline-none',
    'cursor-pointer data-disabled:cursor-not-allowed',
    'data-disabled:opacity-40',
    ...SWITCH_ROOT_MODE_CLASSES[mode]
  ]}
  {...restProps}
>
  <Switch.Thumb
    class={[
      'shrink-0 w-4 h-4 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 inline rounded-full outline-none',
      ...SWITCH_THUMB_MODE_CLASSES[mode]
    ]}
    {...thumbProps}
  />
</Switch.Root>
