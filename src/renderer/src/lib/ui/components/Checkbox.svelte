<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export const CHECKBOX_MODE_CLASSES = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 data-[state=checked]:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-data-disabled:hover:text-blue-200 bg-blue-800/30 not-data-disabled:hover:bg-blue-800 data-[state=checked]:bg-blue-800 data-[state=checked]:text-blue-200 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-data-disabled:hover:text-green-200 bg-green-800/30 not-data-disabled:hover:bg-green-800 data-[state=checked]:bg-green-800 data-[state=checked]:text-green-200 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-data-disabled:hover:text-yellow-200 bg-yellow-800/30 not-data-disabled:hover:bg-yellow-800 data-[state=checked]:bg-yellow-800 data-[state=checked]:text-yellow-200 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-data-disabled:hover:text-red-200 bg-red-800/30 not-data-disabled:hover:bg-red-800 data-[state=checked]:bg-red-800 data-[state=checked]:text-red-200 inset-ring-red-800 ring-red-800'
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
    'shrink-0 min-w-6 min-h-6 flex items-center justify-center rounded-sm p-1 outline-none transition-colors',
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
