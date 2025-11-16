<script lang="ts" module>
  import { type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  export type ComboBoxItem = {
    value: string
    label: string
    comment?: string
    disabled?: boolean
  }

  export type ComboBoxModes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  export const COMBOBOX_INPUT_MODE_CLASSES: Record<ComboBoxModes, string[]> = {
    neutral: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
    ],
    info: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-blue-500 not-data-disabled:hover:text-blue-200 bg-blue-800/30 not-data-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-green-500 not-data-disabled:hover:text-green-200 bg-green-800/30 not-data-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-yellow-500 not-data-disabled:hover:text-yellow-200 bg-yellow-800/30 not-data-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-red-500 not-data-disabled:hover:text-red-200 bg-red-800/30 not-data-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800'
    ]
  } as const

  export const COMBOBOX_TRIGGER_MODE_CLASSES: Record<ComboBoxModes, string[]> = {
    neutral: ['focus-visible:inset-ring-1 focus-visible:ring-2', 'not-data-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'],
    info: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-data-disabled:hover:text-blue-200 not-data-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-data-disabled:hover:text-green-200 not-data-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-data-disabled:hover:text-yellow-200 not-data-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-data-disabled:hover:text-red-200 not-data-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800'
    ]
  } as const

  export type ComboBoxInputProps = Omit<WithoutChildrenOrChild<Combobox.InputProps>, 'class' | 'clearOnDeselect'>

  export type ComboBoxTriggerProps = Omit<WithoutChildrenOrChild<Combobox.TriggerProps>, 'class'>

  export type ComboBoxContentProps = Omit<WithoutChildrenOrChild<Combobox.ContentProps>, 'class' | 'sideOffset'>

  export type ComboBoxViewportProps = Omit<WithoutChildrenOrChild<Combobox.ViewportProps>, 'class'>

  export type ComboBoxItemProps = Omit<WithoutChildrenOrChild<Combobox.ItemProps>, 'class' | 'value' | 'label' | 'disabled'>

  export type ComboBoxProps = Omit<WithoutChildren<Combobox.RootProps>, 'class' | 'items'> & {
    items: ComboBoxItem[]
    mode?: ComboBoxModes | undefined
    inputProps?: ComboBoxInputProps | undefined
    triggerProps?: ComboBoxTriggerProps | undefined
    contentProps?: ComboBoxContentProps | undefined
    viewportProps?: ComboBoxViewportProps | undefined
    itemProps?: ComboBoxItemProps | undefined
  }
</script>

<script lang="ts">
  import { Combobox, mergeProps } from 'bits-ui'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  let {
    items,
    value = $bindable(),
    open = $bindable(false),
    mode = 'neutral',
    type,
    onValueChange,
    allowDeselect = false,
    inputProps,
    triggerProps,
    contentProps,
    viewportProps,
    itemProps,
    ...restProps
  }: ComboBoxProps = $props()

  let searchValue = $state('')

  const filteredItems = $derived.by(() => {
    if (searchValue === '') return items
    return items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
  })

  function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
    searchValue = e.currentTarget.value
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) searchValue = ''
  }

  const mergedRootProps = $derived(mergeProps(restProps, { onOpenChange: handleOpenChange }))
  const mergedInputProps = $derived(mergeProps(inputProps, { oninput: handleInput }))
</script>

<Combobox.Root {type} {items} bind:value={value as never} onValueChange={onValueChange as never} bind:open {allowDeselect} {...mergedRootProps}>
  <div class="relative w-full flex items-center">
    <Combobox.Input
      clearOnDeselect
      class={[
        'w-full min-w-9 min-h-9 flex items-center justify-between gap-2 p-2 leading-tight rounded-sm outline-none transition-all',
        'cursor-pointer data-disabled:cursor-not-allowed read-only:cursor-default',
        'data-disabled:opacity-40',
        ...COMBOBOX_INPUT_MODE_CLASSES[mode]
      ]}
      {...mergedInputProps}
    />

    <Combobox.Trigger
      class={[
        'absolute right-0 shrink-0 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 leading-tight rounded-sm outline-none transition-all',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        ...COMBOBOX_TRIGGER_MODE_CLASSES[mode]
      ]}
      {...triggerProps}
    >
      <Icon icon="ph:caret-up-down" />
    </Combobox.Trigger>
  </div>

  <Combobox.Portal to="#portal">
    <Combobox.Content
      sideOffset={4}
      class={[
        'max-h-[calc(var(--bits-combobox-content-available-height)-0.5rem)] w-(--bits-combobox-anchor-width) z-50 flex flex-col backdrop-blur-xs rounded-sm shadow-xl outline-none transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        'bg-zinc-900/95 inset-ring-zinc-800'
      ]}
      {...contentProps}
    >
      <Combobox.Viewport class={['p-2 flex flex-col']} {...viewportProps}>
        {#each filteredItems as { value, label, comment, disabled } (value)}
          <Combobox.Item
            {value}
            {label}
            {disabled}
            class={[
              'w-full flex items-center justify-between px-2 py-1 rounded-sm transition-all',
              'cursor-pointer data-disabled:cursor-not-allowed',
              'data-disabled:opacity-40',
              'not-data-disabled:hover:bg-zinc-800 data-highlighted:bg-zinc-800'
            ]}
            {...itemProps}
          >
            {#snippet children({ selected })}
              <span class="w-full flex items-end gap-2">
                <span>{label}</span>
                <span class="text-current/50 text-sm">{comment}</span>
              </span>

              {#if selected}
                <Icon icon="ph:check" />
              {/if}
            {/snippet}
          </Combobox.Item>
        {:else}
          <span class={['w-full flex items-center justify-center px-2 py-4 text-sm opacity-40 cursor-pointer']}>
            {`${m.common__no_results_found()}...`}
          </span>
        {/each}
      </Combobox.Viewport>
    </Combobox.Content>
  </Combobox.Portal>
</Combobox.Root>
