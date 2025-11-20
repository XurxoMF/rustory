<script lang="ts" module>
  import { type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  export type ComboBoxModes = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  export const COMBOBOX_INPUT_MODE_CLASSES: Record<ComboBoxModes, string[]> = {
    neutral: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:bg-zinc-300/50 t-light:not-data-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    info: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-blue-500 not-data-disabled:hover:text-blue-200 bg-blue-800/30 not-data-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800',
      't-light:text-blue-500 t-light:not-data-disabled:hover:text-blue-800 t-light:bg-blue-300/30 t-light:not-data-disabled:hover:bg-blue-300 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-green-500 not-data-disabled:hover:text-green-200 bg-green-800/30 not-data-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800',
      't-light:text-green-500 t-light:not-data-disabled:hover:text-green-800 t-light:bg-green-300/30 t-light:not-data-disabled:hover:bg-green-300 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-yellow-500 not-data-disabled:hover:text-yellow-200 bg-yellow-800/30 not-data-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800',
      't-light:text-yellow-500 t-light:not-data-disabled:hover:text-yellow-800 t-light:bg-yellow-300/30 t-light:not-data-disabled:hover:bg-yellow-300 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'inset-ring-2 focus-visible:not-read-only:inset-ring-1 focus-visible:not-read-only:ring-2',
      'text-red-500 not-data-disabled:hover:text-red-200 bg-red-800/30 not-data-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800',
      't-light:text-red-500 t-light:not-data-disabled:hover:text-red-800 t-light:bg-red-300/30 t-light:not-data-disabled:hover:bg-red-300 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export const COMBOBOX_TRIGGER_MODE_CLASSES: Record<ComboBoxModes, string[]> = {
    neutral: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'not-data-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
      't-light:not-data-disabled:hover:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
    ],
    info: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-data-disabled:hover:text-blue-200 not-data-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800',
      't-light:text-blue-500 t-light:not-data-disabled:hover:text-blue-800 t-light:bg-blue-300/30 t-light:not-data-disabled:hover:bg-blue-300 t-light:inset-ring-blue-300 t-light:ring-blue-300'
    ],
    success: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-data-disabled:hover:text-green-200 not-data-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800',
      't-light:text-green-500 t-light:not-data-disabled:hover:text-green-800 t-light:bg-green-300/30 t-light:not-data-disabled:hover:bg-green-300 t-light:inset-ring-green-300 t-light:ring-green-300'
    ],
    warning: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-data-disabled:hover:text-yellow-200 not-data-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800',
      't-light:text-yellow-500 t-light:not-data-disabled:hover:text-yellow-800 t-light:bg-yellow-300/30 t-light:not-data-disabled:hover:bg-yellow-300 t-light:inset-ring-yellow-300 t-light:ring-yellow-300'
    ],
    danger: [
      'focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-data-disabled:hover:text-red-200 not-data-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800',
      't-light:text-red-500 t-light:not-data-disabled:hover:text-red-800 t-light:bg-red-300/30 t-light:not-data-disabled:hover:bg-red-300 t-light:inset-ring-red-300 t-light:ring-red-300'
    ]
  } as const

  export type ComboBoxItem = {
    value: string
    label: string
    comment?: string | undefined
    disabled?: boolean | undefined
  }

  export type ComboBoxInputProps = WithoutKeys<WithoutChildrenOrChild<Combobox.InputProps>, 'class' | 'clearOnDeselect'>

  export type ComboBoxTriggerProps = WithoutKeys<WithoutChildrenOrChild<Combobox.TriggerProps>, 'class'>

  export type ComboBoxContentProps = WithoutKeys<WithoutChildrenOrChild<Combobox.ContentProps>, 'class' | 'sideOffset'>

  export type ComboBoxViewportProps = WithoutKeys<WithoutChildrenOrChild<Combobox.ViewportProps>, 'class'>

  export type ComboBoxItemProps = WithoutKeys<WithoutChildrenOrChild<Combobox.ItemProps>, 'class' | 'value' | 'label' | 'disabled'>

  export type ComboBoxProps = WithoutKeys<WithoutChildren<Combobox.RootProps>, 'class' | 'items'> & {
    items?: ComboBoxItem[] | undefined
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

  import { PHCaretUpDownBoldIcon, PHCheckBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let {
    items,
    value = $bindable(),
    open = $bindable(false),
    mode = 'neutral',
    allowDeselect = false,
    inputProps,
    triggerProps,
    contentProps,
    viewportProps,
    itemProps,
    ...restProps
  }: ComboBoxProps = $props()

  let searchValue = $state('')

  const filteredItems = $derived(searchValue === '' ? items : items?.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())))

  function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
    searchValue = e.currentTarget.value
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) searchValue = ''
  }

  const mergedRootProps: typeof restProps = $derived(mergeProps(restProps, { onOpenChange: handleOpenChange }))
  const mergedInputProps = $derived(mergeProps(inputProps, { oninput: handleInput }))
</script>

<Combobox.Root {items} bind:value={value as never} bind:open {allowDeselect} {...mergedRootProps}>
  <div class="relative w-full flex items-center">
    <Combobox.Input
      clearOnDeselect
      class={[
        'w-full min-w-9 min-h-9 flex items-center justify-between gap-2 p-2 leading-tight rounded-sm outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed read-only:cursor-default',
        'data-disabled:opacity-40',
        'placeholder:text-current/30',
        ...COMBOBOX_INPUT_MODE_CLASSES[mode]
      ]}
      {...mergedInputProps}
    />

    <Combobox.Trigger
      class={[
        'absolute right-0 shrink-0 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 rounded-sm outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        ...COMBOBOX_TRIGGER_MODE_CLASSES[mode]
      ]}
      {...triggerProps}
    >
      <PHCaretUpDownBoldIcon />
    </Combobox.Trigger>
  </div>

  <Combobox.Portal to="#portal">
    <Combobox.Content
      sideOffset={4}
      class={[
        'max-h-[calc(var(--bits-combobox-content-available-height)-0.5rem)] w-(--bits-combobox-anchor-width) z-300 flex flex-col backdrop-blur-xs rounded-sm shadow-xl outline-none @container',
        'inset-ring-2',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'bg-zinc-900/95 inset-ring-zinc-800',
        't-light:bg-zinc-100/90 t-light:inset-ring-zinc-300'
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
              'w-full flex items-center justify-between p-2 rounded-sm',
              'cursor-pointer data-disabled:cursor-not-allowed',
              'data-disabled:opacity-40',
              'not-data-disabled:hover:bg-zinc-800 data-highlighted:bg-zinc-800',
              't-light:not-data-disabled:hover:bg-zinc-300 t-light:data-highlighted:bg-zinc-300'
            ]}
            {...itemProps}
          >
            {#snippet children({ selected })}
              <span class="w-full flex items-end gap-2 leading-tight">
                {label}
                <span class="text-current/50 text-sm leading-tight">{comment}</span>
              </span>

              {#if selected}
                <PHCheckBoldIcon />
              {/if}
            {/snippet}
          </Combobox.Item>
        {:else}
          <span class={['w-full flex items-center justify-center px-2 py-4 text-sm text-current/50 cursor-pointer']}>
            {`${m.common__no_results_found()}...`}
          </span>
        {/each}
      </Combobox.Viewport>
    </Combobox.Content>
  </Combobox.Portal>
</Combobox.Root>
