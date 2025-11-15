<script lang="ts">
  import { Select, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  const MODE_CLASSES = {
    transparent: ['focus-visible:inset-ring-1 focus-visible:ring-2', 't-dark:not-disabled:hover:bg-zinc-800 t-dark:inset-ring-zinc-800 t-dark:ring-zinc-800'],
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      't-dark:bg-zinc-800/30 t-dark:not-disabled:hover:bg-zinc-800 t-dark:inset-ring-zinc-800 t-dark:ring-zinc-800'
    ],
    info: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-blue-500 not-disabled:hover:text-blue-200 bg-blue-800/30 not-disabled:hover:bg-blue-800 inset-ring-blue-800 ring-blue-800'
    ],
    success: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-green-500 not-disabled:hover:text-green-200 bg-green-800/30 not-disabled:hover:bg-green-800 inset-ring-green-800 ring-green-800'
    ],
    warning: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-yellow-500 not-disabled:hover:text-yellow-200 bg-yellow-800/30 not-disabled:hover:bg-yellow-800 inset-ring-yellow-800 ring-yellow-800'
    ],
    danger: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'text-red-500 not-disabled:hover:text-red-200 bg-red-800/30 not-disabled:hover:bg-red-800 inset-ring-red-800 ring-red-800'
    ]
  } as const

  type ModeTypes = keyof typeof MODE_CLASSES

  type SelectItem = {
    value: string
    label: string
    comment?: string
    disabled?: boolean
  }

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
      'w-full min-w-9 min-h-9 flex items-center justify-between gap-2 p-2 leading-tight rounded-sm outline-none transition-all duration-100',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      ...MODE_CLASSES[mode]
    ]}
    {...triggerProps}
  >
    <span class="w-full flex items-center justify-start gap-2">
      {#if selected}
        <p>{selected.label}</p>
        <p class="text-sm opacity-40">{selected.comment}</p>
      {:else}
        <p class="opacity-40">{placeholder}</p>
      {/if}
    </span>

    <Icon icon="ph:caret-up-down" />
  </Select.Trigger>

  <Select.Portal to="#portal">
    <Select.Content
      sideOffset={4}
      class={[
        'w-(--bits-select-anchor-width) h-fit max-h-60 z-50 flex flex-col rounded-md border shadow/20 transition-[border,background-color] duration-100',
        't-dark:bg-zinc-850 t-dark:border-zinc-800',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-800',
        't-midnight:bg-gray-850 t-midnight:border-gray-800'
      ]}
      {...contentProps}
    >
      <Select.Viewport {...viewportProps}>
        {#each items as { value, label, comment, disabled } (value)}
          <Select.Item
            {value}
            {label}
            {disabled}
            class={[
              'w-full flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-[opacity,background-color] duration-100',
              'cursor-pointer data-disabled:cursor-not-allowed',
              'data-disabled:opacity-40',
              't-dark:data-highlighted:bg-zinc-800',
              't-light:data-highlighted:bg-zinc-200',
              't-rust:data-highlighted:bg-rust-800',
              't-midnight:data-highlighted:bg-gray-800'
            ]}
          >
            {#snippet children({ selected })}
              <span class="w-full flex items-center justify-start gap-2">
                <p>{label}</p>
                <p class="text-sm opacity-40">{comment}</p>
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
