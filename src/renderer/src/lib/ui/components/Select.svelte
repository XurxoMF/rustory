<script lang="ts" module>
  export type SelectItem = {
    value: string
    label: string
    comment?: string
    disabled?: boolean
  }
</script>

<script lang="ts">
  import { Select, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  const MODE_CLASSES = {
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      't-dark:bg-zinc-800/50 t-dark:not-data-disabled:hover:bg-zinc-800 t-dark:inset-ring-zinc-800 t-dark:ring-zinc-800'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-data-disabled:hover:text-blue-200 bg-blue-800/30 not-data-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-data-disabled:hover:text-green-200 bg-green-800/30 not-data-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-data-disabled:hover:text-yellow-200 bg-yellow-800/30 not-data-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-data-disabled:hover:text-red-200 bg-red-800/30 not-data-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800'
    ]
  } as const

  type ModeTypes = keyof typeof MODE_CLASSES

  type SelectProps = Omit<WithoutChildrenOrChild<Select.RootProps>, 'class' | 'items'> & {
    items: SelectItem[]
    placeholder: string | undefined
    mode?: ModeTypes | undefined
    triggerProps?: Omit<WithoutChildrenOrChild<Select.TriggerProps>, 'class'> | undefined
    contentProps?: Omit<WithoutChildrenOrChild<Select.ContentProps>, 'class' | 'sideOffset'> | undefined
    viewportProps?: Omit<WithoutChildrenOrChild<Select.ViewportProps>, 'class'> | undefined
    itemProps?: Omit<WithoutChildrenOrChild<Select.ItemProps>, 'class' | 'value' | 'label' | 'disabled'> | undefined
  }

  let {
    value = $bindable(),
    items,
    placeholder,
    mode = 'neutral',
    onValueChange,
    allowDeselect = false,
    triggerProps,
    contentProps,
    viewportProps,
    ...restProps
  }: SelectProps = $props()

  const selected = $derived(items.find((item) => item.value === value))
</script>

<Select.Root bind:value={value as never} onValueChange={onValueChange as never} {allowDeselect} {...restProps}>
  <Select.Trigger
    class={[
      'w-full min-w-9 min-h-9 flex items-center justify-between gap-2 p-2 rounded-sm outline-none transition-all',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      ...MODE_CLASSES[mode]
    ]}
    {...triggerProps}
  >
    <span class="w-full flex items-end gap-2">
      {#if selected}
        <p class="leading-tight">{selected.label}</p>
        <p class="text-zinc-200/50 text-sm leading-tight">{selected.comment}</p>
      {:else}
        <p class="opacity-40 leading-tight">{placeholder}</p>
      {/if}
    </span>

    <Icon icon="ph:caret-up-down" />
  </Select.Trigger>

  <Select.Portal to="#portal">
    <Select.Content
      sideOffset={4}
      class={[
        'max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) z-50 flex flex-col backdrop-blur-xs rounded-sm shadow-xl outline-none transition-all',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        't-dark:bg-zinc-900/95 t-dark:inset-ring-zinc-800'
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
              'w-full flex items-center justify-between p-2 rounded-sm outline-none transition-all',
              'cursor-pointer data-disabled:cursor-not-allowed',
              'data-disabled:opacity-40',
              't-dark:not-data-disabled:hover:bg-zinc-800 t-dark:data-highlighted:bg-zinc-800'
            ]}
          >
            {#snippet children({ selected })}
              <span class="w-full flex items-center gap-2">
                <p class="leading-tight">{label}</p>
                <p class="text-zinc-200/50 text-sm leading-tight">{comment}</p>
              </span>

              {#if selected}
                <Icon icon="ph:check" />
              {/if}
            {/snippet}
          </Select.Item>
        {/each}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>
