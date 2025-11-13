<script lang="ts">
  import { ContextMenu, type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Label from '@renderer/lib/ui/components/Label.svelte'

  type ContextMenuGroup = {
    type: 'group'
    label?: string | undefined
    items: ContextMenuItemTypes[]
    groupProps?: Omit<WithoutChildrenOrChild<ContextMenu.GroupProps>, 'class'> | undefined
    headingProps?: Omit<WithoutChildrenOrChild<ContextMenu.GroupHeadingProps>, 'class'> | undefined
  }

  type ContextMenuItem = {
    type: 'item'
    label: string
    value: string
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemProps?: Omit<WithoutChildrenOrChild<ContextMenu.ItemProps>, 'class' | 'onSelect' | 'textValue' | 'disabled'> | undefined
  }

  type ContextMenuCheckboxItem = {
    type: 'checkboxitem'
    label: string
    value: string
    disabled?: boolean | undefined
    checked?: boolean | undefined
    onchange: (checked: boolean) => void
    checkboxItemProps?: Omit<WithoutChildrenOrChild<ContextMenu.CheckboxItemProps>, 'class' | 'value' | 'disabled' | 'checked' | 'onCheckedChange'> | undefined
  }

  type ContextMenuRadioGroup = {
    type: 'radiogroup'
    label?: string
    items: ContextMenuRadioItem[]
    value?: string | undefined
    onchange: (value: string) => void
    radioGroupProps?: Omit<WithoutChildrenOrChild<ContextMenu.RadioGroupProps>, 'class' | 'valie' | 'onValueChange'> | undefined
    headingProps?: Omit<WithoutChildrenOrChild<ContextMenu.GroupHeadingProps>, 'class'> | undefined
  }

  type ContextMenuRadioItem = {
    type: 'radioitem'
    label: string
    value: string
    disabled?: boolean | undefined
    radioItemProps?: Omit<WithoutChildrenOrChild<ContextMenu.RadioItemProps>, 'class' | 'value' | 'disabled'> | undefined
  }

  type ContextMenuSubmenu = {
    type: 'submenu'
    label: string
    items: ContextMenuGroupTypes[]
    icon: string
    submenuProps?: WithoutChildren<ContextMenu.SubProps> | undefined
    submenuTriggerProps?: Omit<WithoutChildrenOrChild<ContextMenu.SubTriggerProps>, 'class'> | undefined
    submenuContentProps?: Omit<WithoutChildrenOrChild<ContextMenu.SubContentProps>, 'class' | 'sideOffset'> | undefined
  }

  type ContextMenuItemSubmenu = {
    type: 'itemsubmenu'
    label: string
    value: string
    items: ContextMenuGroupTypes[]
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemSubmenuProps?: WithoutChildren<ContextMenu.SubProps> | undefined
    itemSubmenuTriggerProps?: Omit<WithoutChildrenOrChild<ContextMenu.SubTriggerProps>, 'class' | 'textValue' | 'disabled' | 'onSelect'> | undefined
    itemSubmenuContentProps?: Omit<WithoutChildrenOrChild<ContextMenu.SubContentProps>, 'class' | 'sideOffset'> | undefined
  }

  type ContextMenuItemTypes = ContextMenuItem | ContextMenuCheckboxItem | ContextMenuSubmenu | ContextMenuItemSubmenu

  type ContextMenuGroupTypes = ContextMenuGroup | ContextMenuRadioGroup

  type ContextMenuProps = ContextMenu.RootProps & {
    groups: ContextMenuGroupTypes[]
    triggerProps?: Omit<WithoutChildrenOrChild<ContextMenu.TriggerProps>, 'class'> | undefined
    contentProps?: Omit<WithoutChildrenOrChild<ContextMenu.ContentProps>, 'class'> | undefined
    separatorProps?: Omit<WithoutChildrenOrChild<ContextMenu.SeparatorProps>, 'class'> | undefined
  }

  let { open = $bindable(false), children, groups, triggerProps, contentProps, separatorProps, ...restProps }: ContextMenuProps = $props()
</script>

<ContextMenu.Root bind:open {...restProps}>
  <ContextMenu.Trigger class={['rounded-md transition-opacity duration-200', 'cursor-pointer disabled:cursor-not-allowed', 'disabled:opacity-40']} {...triggerProps}>
    {@render children?.()}
  </ContextMenu.Trigger>

  <ContextMenu.Portal to="#portal">
    <ContextMenu.Content
      class={[
        'min-w-48 z-50 p-1 rounded-md border shadow/20 transition-[border,background-color] duration-200',
        'outline-none',
        't-dark:bg-zinc-850 t-dark:border-zinc-750',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-750',
        't-midnight:bg-gray-850 t-midnight:border-gray-750'
      ]}
      {...contentProps}
    >
      {@render CMRenderGroups(groups)}
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>

{#snippet CMGroup({ label, items, groupProps, headingProps }: ContextMenuGroup)}
  <ContextMenu.Group {...groupProps}>
    {#if label}
      <ContextMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']} {...headingProps}>{label}</ContextMenu.GroupHeading>
    {/if}

    {@render CMRenderItems(items)}
  </ContextMenu.Group>
{/snippet}

{#snippet CMItem({ label, value, icon, disabled, onselect, itemProps }: ContextMenuItem)}
  <ContextMenu.Item
    onSelect={onselect}
    {disabled}
    textValue={value}
    class={[
      'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity,background-color] duration-200',
      'outline-none',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      't-dark:data-highlighted:bg-zinc-800',
      't-light:data-highlighted:bg-zinc-200',
      't-rust:data-highlighted:bg-rust-800',
      't-midnight:data-highlighted:bg-gray-800'
    ]}
    {...itemProps}
  >
    <Icon {icon} class="w-5 h-5 flex items-center justify-center opacity-40" />
    <span>{label}</span>
  </ContextMenu.Item>
{/snippet}

{#snippet CMCheckboxItem({ label, value, disabled, checked, onchange, checkboxItemProps }: ContextMenuCheckboxItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity duration-200">
    <ContextMenu.CheckboxItem
      {value}
      {disabled}
      {checked}
      onCheckedChange={onchange}
      class={[
        'w-5 h-5 flex items-center justify-center rounded-md p-0.5 shadow/20 transition-[opacity,background-color] duration-200',
        'focus-visible:outline-1',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        't-dark:bg-zinc-800 t-dark:data-[state=checked]:bg-zinc-750 t-dark:focus-visible:outline-zinc-750',
        't-light:bg-zinc-200 t-light:data-[state=checked]:bg-zinc-300 t-light:focus-visible:outline-zinc-300',
        't-rust:bg-rust-800 t-rust:data-[state=checked]:bg-rust-750 t-rust:focus-visible:outline-rust-750',
        't-midnight:bg-gray-800 t-midnight:data-[state=checked]:bg-gray-750 t-midnight:focus-visible:outline-gray-750'
      ]}
      {...checkboxItemProps}
    >
      {#snippet children({ checked, indeterminate })}
        {#if indeterminate}
          <Icon icon="ph:dots-three" />
        {:else if checked}
          <Icon icon="ph:check" />
        {/if}
      {/snippet}
    </ContextMenu.CheckboxItem>
    <Label {disabled}>{label}</Label>
  </div>
{/snippet}

{#snippet CMRadioGroup({ label, value, items, onchange, radioGroupProps, headingProps }: ContextMenuRadioGroup)}
  <ContextMenu.RadioGroup {value} onValueChange={onchange} {...radioGroupProps}>
    {#if label}
      <ContextMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']} {...headingProps}>{label}</ContextMenu.GroupHeading>
    {/if}

    {#each items as item}
      {@render CMRadioItem(item)}
    {/each}
  </ContextMenu.RadioGroup>
{/snippet}

{#snippet CMRadioItem({ label, value, disabled, radioItemProps }: ContextMenuRadioItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity duration-200">
    <ContextMenu.RadioItem
      {value}
      {disabled}
      class={[
        'w-5 h-5 flex items-center justify-center rounded-full p-0.5 shadow/20 transition-[opacity,background-color] duration-200',
        'focus-visible:outline-1',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:bg-zinc-800 t-dark:data-[state=checked]:bg-zinc-750 t-dark:focus-visible:outline-zinc-750',
        't-light:bg-zinc-200 t-light:data-[state=checked]:bg-zinc-300 t-light:focus-visible:outline-zinc-300',
        't-rust:bg-rust-800 t-rust:data-[state=checked]:bg-rust-750 t-rust:focus-visible:outline-rust-750',
        't-midnight:bg-gray-800 t-midnight:data-[state=checked]:bg-gray-750 t-midnight:focus-visible:outline-gray-750'
      ]}
      {...radioItemProps}
    >
      {#snippet children({ checked })}
        {#if checked}
          <Icon icon="ph:check" />
        {/if}
      {/snippet}
    </ContextMenu.RadioItem>
    <Label {disabled}>{label}</Label>
  </div>
{/snippet}

{#snippet CMSubmenu({ label, icon, items, submenuProps, submenuTriggerProps, submenuContentProps }: ContextMenuSubmenu)}
  <ContextMenu.Sub {...submenuProps}>
    <ContextMenu.SubTrigger
      class={[
        'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity,background-color] duration-200',
        'outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        't-dark:data-highlighted:bg-zinc-800',
        't-light:data-highlighted:bg-zinc-200',
        't-rust:data-highlighted:bg-rust-800',
        't-midnight:data-highlighted:bg-gray-800'
      ]}
      {...submenuTriggerProps}
    >
      <Icon {icon} class="w-4 h-4 flex items-center justify-center opacity-40" />
      <span>{label}</span>
      <Icon icon="ph:caret-right" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </ContextMenu.SubTrigger>

    <ContextMenu.SubContent
      sideOffset={12}
      class={[
        'min-w-48 z-50 p-1 rounded-md border shadow/20 transition-[border,background-color] duration-200',
        'outline-none',
        't-dark:bg-zinc-850 t-dark:border-zinc-750',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-750',
        't-midnight:bg-gray-850 t-midnight:border-gray-750'
      ]}
      {...submenuContentProps}
    >
      {@render CMRenderGroups(items)}
    </ContextMenu.SubContent>
  </ContextMenu.Sub>
{/snippet}

{#snippet CMItemSubmenu({ label, icon, value, items, disabled, onselect, itemSubmenuProps, itemSubmenuTriggerProps, itemSubmenuContentProps }: ContextMenuItemSubmenu)}
  <ContextMenu.Sub {...itemSubmenuProps}>
    <ContextMenu.SubTrigger
      onSelect={onselect}
      {disabled}
      textValue={value}
      class={[
        'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity,background-color] duration-200',
        'outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        't-dark:data-highlighted:bg-zinc-800',
        't-light:data-highlighted:bg-zinc-200',
        't-rust:data-highlighted:bg-rust-800',
        't-midnight:data-highlighted:bg-gray-800'
      ]}
      {...itemSubmenuTriggerProps}
    >
      <Icon {icon} class="w-4 h-4 flex items-center justify-center opacity-40" />
      <span>{label}</span>
      <Icon icon="ph:caret-right" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </ContextMenu.SubTrigger>

    <ContextMenu.SubContent
      sideOffset={12}
      class={[
        'min-w-48 z-50 p-1 rounded-md border shadow/20 transition-[border,background-color] duration-200',
        'outline-none',
        't-dark:bg-zinc-850 t-dark:border-zinc-750',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-750',
        't-midnight:bg-gray-850 t-midnight:border-gray-750'
      ]}
      {...itemSubmenuContentProps}
    >
      {@render CMRenderGroups(items)}
    </ContextMenu.SubContent>
  </ContextMenu.Sub>
{/snippet}

{#snippet CMRenderItems(items: ContextMenuItemTypes[])}
  {#each items as item}
    {#if item.type === 'item'}
      {@render CMItem(item)}
    {:else if item.type === 'checkboxitem'}
      {@render CMCheckboxItem(item)}
    {:else if item.type === 'submenu'}
      {@render CMSubmenu(item)}
    {:else if item.type === 'itemsubmenu'}
      {@render CMItemSubmenu(item)}
    {/if}
  {/each}
{/snippet}

{#snippet CMRenderGroups(groups: ContextMenuGroupTypes[])}
  {#each groups as group, i}
    {#if group.type === 'group'}
      {@render CMGroup(group)}
    {:else if group.type === 'radiogroup'}
      {@render CMRadioGroup(group)}
    {/if}

    {#if i < groups.length - 1}
      <ContextMenu.Separator class={['w-full h-px my-2', 't-dark:bg-zinc-750', 't-light:bg-zinc-350', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} {...separatorProps} />
    {/if}
  {/each}
{/snippet}
