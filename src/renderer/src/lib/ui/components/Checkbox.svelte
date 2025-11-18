<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export const CHECKBOX_MODE_CLASSES = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 data-[state=checked]:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:bg-zinc-300/50 t-light:not-data-disabled:hover:bg-zinc-300 t-light:data-[state=checked]:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-data-disabled:hover:text-blue-200 bg-blue-800/30 not-data-disabled:hover:bg-blue-800 data-[state=checked]:bg-blue-800 data-[state=checked]:text-blue-200 inset-ring-blue-800 ring-blue-800',
      't-light:text-blue-500 t-light:not-data-disabled:hover:text-blue-800 t-light:bg-blue-300/30 t-light:not-data-disabled:hover:bg-blue-300 t-light:data-[state=checked]:bg-blue-300 t-light:data-[state=checked]:text-blue-800 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-data-disabled:hover:text-green-200 bg-green-800/30 not-data-disabled:hover:bg-green-800 data-[state=checked]:bg-green-800 data-[state=checked]:text-green-200 inset-ring-green-800 ring-green-800',
      't-light:text-green-500 t-light:not-data-disabled:hover:text-green-800 t-light:bg-green-300/30 t-light:not-data-disabled:hover:bg-green-300 t-light:data-[state=checked]:bg-green-300 t-light:data-[state=checked]:text-green-800 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-data-disabled:hover:text-yellow-200 bg-yellow-800/30 not-data-disabled:hover:bg-yellow-800 data-[state=checked]:bg-yellow-800 data-[state=checked]:text-yellow-200 inset-ring-yellow-800 ring-yellow-800',
      't-light:text-yellow-500 t-light:not-data-disabled:hover:text-yellow-800 t-light:bg-yellow-300/30 t-light:not-data-disabled:hover:bg-yellow-300 t-light:data-[state=checked]:bg-yellow-300 t-light:data-[state=checked]:text-yellow-800 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-data-disabled:hover:text-red-200 bg-red-800/30 not-data-disabled:hover:bg-red-800 data-[state=checked]:bg-red-800 data-[state=checked]:text-red-200 inset-ring-red-800 ring-red-800',
      't-light:text-red-500 t-light:not-data-disabled:hover:text-red-800 t-light:bg-red-300/30 t-light:not-data-disabled:hover:bg-red-300 t-light:data-[state=checked]:bg-red-300 t-light:data-[state=checked]:text-red-800 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export type CheckboxModeTypes = keyof typeof CHECKBOX_MODE_CLASSES

  export type CheckboxProps = WithoutKeys<WithoutChildrenOrChild<Checkbox.RootProps>, 'class'> & {
    mode?: CheckboxModeTypes | undefined
  }
</script>

<script lang="ts">
  import { Checkbox } from 'bits-ui'

  import { PHCheckBoldIcon, PHQuestionMarkBoldIcon, PHXBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let { checked = $bindable(false), mode = 'neutral', ...restProps }: CheckboxProps = $props()
</script>

<Checkbox.Root
  bind:checked
  class={[
    'shrink-0 min-w-6 min-h-6 flex items-center justify-center rounded-sm p-1 outline-none transition-all duration-200',
    'cursor-pointer data-disabled:cursor-not-allowed',
    'data-disabled:opacity-40',
    ...CHECKBOX_MODE_CLASSES[mode]
  ]}
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    {#if indeterminate}
      <PHQuestionMarkBoldIcon />
    {:else if checked}
      <PHCheckBoldIcon />
    {:else}
      <PHXBoldIcon />
    {/if}
  {/snippet}
</Checkbox.Root>
