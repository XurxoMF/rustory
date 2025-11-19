<script lang="ts" module>
  import { type WithoutChildrenOrChild } from 'bits-ui'

  export const SELECT_MODE_CLASSES = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:bg-zinc-300/50 t-light:not-data-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-data-disabled:hover:text-blue-200 bg-blue-800/30 not-data-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800',
      't-light:text-blue-500 t-light:not-data-disabled:hover:text-blue-800 t-light:bg-blue-300/30 t-light:not-data-disabled:hover:bg-blue-300 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-data-disabled:hover:text-green-200 bg-green-800/30 not-data-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800',
      't-light:text-green-500 t-light:not-data-disabled:hover:text-green-800 t-light:bg-green-300/30 t-light:not-data-disabled:hover:bg-green-300 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-data-disabled:hover:text-yellow-200 bg-yellow-800/30 not-data-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800',
      't-light:text-yellow-500 t-light:not-data-disabled:hover:text-yellow-800 t-light:bg-yellow-300/30 t-light:not-data-disabled:hover:bg-yellow-300 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-data-disabled:hover:text-red-200 bg-red-800/30 not-data-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800',
      't-light:text-red-500 t-light:not-data-disabled:hover:text-red-800 t-light:bg-red-300/30 t-light:not-data-disabled:hover:bg-red-300 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export type SelectModeTypes = keyof typeof SELECT_MODE_CLASSES

  export type SelectItem = {
    value: string
    label: string
    comment?: string | undefined
    disabled?: boolean | undefined
  }

  export type SelectTriggerProps = WithoutKeys<WithoutChildrenOrChild<Select.TriggerProps>, 'class'>

  export type SelectContentProps = WithoutKeys<WithoutChildrenOrChild<Select.ContentProps>, 'class' | 'sideOffset'>

  export type SelectViewportProps = WithoutKeys<WithoutChildrenOrChild<Select.ViewportProps>, 'class'>

  export type SelectItemProps = WithoutKeys<WithoutChildrenOrChild<Select.ItemProps>, 'class' | 'value' | 'label' | 'disabled'>

  export type SelectProps = WithoutKeys<WithoutChildrenOrChild<Select.RootProps>, 'class' | 'items'> & {
    items?: SelectItem[] | undefined
    placeholder: string | undefined
    mode?: SelectModeTypes | undefined
    triggerProps?: SelectTriggerProps | undefined
    contentProps?: SelectContentProps | undefined
    viewportProps?: SelectViewportProps | undefined
    itemProps?: SelectItemProps | undefined
  }
</script>

<script lang="ts">
  import { Select } from 'bits-ui'

  import { m } from '@renderer/paraglide/messages'
  import { PHCaretUpDownBoldIcon, PHCheckBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let {
    value = $bindable(),
    items = $bindable([]),
    placeholder,
    mode = 'neutral',
    allowDeselect = false,
    triggerProps,
    contentProps,
    viewportProps,
    ...restProps
  }: SelectProps = $props()

  const selected = $derived(items?.length ? items.filter((item) => value === item.value) : undefined)
</script>

<Select.Root bind:value={value as never} {allowDeselect} {...restProps}>
  <Select.Trigger
    class={[
      'w-full min-w-10 min-h-10 flex items-center justify-between gap-2 p-2 rounded-sm outline-none',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      ...SELECT_MODE_CLASSES[mode]
    ]}
    {...triggerProps}
  >
    {#if selected && selected.length > 0}
      <span>{selected.map((s) => s.label).join(', ')}</span>
    {:else}
      <span class="text-current/30">{placeholder}</span>
    {/if}
    <PHCaretUpDownBoldIcon />
  </Select.Trigger>

  <Select.Portal to="#portal">
    <Select.Content
      sideOffset={4}
      class={[
        'max-h-[calc(var(--bits-select-content-available-height)-0.5rem)] w-(--bits-select-anchor-width) z-300 flex flex-col backdrop-blur-xs rounded-sm shadow-xl outline-none @container',
        'inset-ring-2',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'bg-zinc-900/95 inset-ring-zinc-800',
        't-light:bg-zinc-100/90 t-light:inset-ring-zinc-300'
      ]}
      {...contentProps}
    >
      <Select.Viewport class={['p-2 flex flex-col']} {...viewportProps}>
        {#each items as { value, label, comment, disabled } (value)}
          <Select.Item
            {value}
            {label}
            {disabled}
            class={[
              'w-full flex items-center justify-between p-2 rounded-sm outline-none',
              'cursor-pointer data-disabled:cursor-not-allowed',
              'data-disabled:opacity-40',
              'not-data-disabled:hover:bg-zinc-800 ddata-highlighted:bg-zinc-800',
              't-light:not-data-disabled:hover:bg-zinc-300 t-light:ddata-highlighted:bg-zinc-300'
            ]}
          >
            {#snippet children({ selected })}
              <span class="w-full flex items-center gap-2">
                <span>{label}</span>
                <span class="text-current/50 text-sm">{comment}</span>
              </span>

              {#if selected}
                <PHCheckBoldIcon />
              {/if}
            {/snippet}
          </Select.Item>
        {:else}
          <span class={['w-full flex items-center justify-center px-2 py-4 text-sm text-current/50 cursor-pointer']}>
            {`${m.common__no_results_found()}...`}
          </span>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
