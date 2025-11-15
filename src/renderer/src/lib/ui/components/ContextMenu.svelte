<script lang="ts" module>
  import { type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  export type ContextMenuGroupProps = Omit<WithoutChildrenOrChild<ContextMenu.GroupProps>, 'class'>

  export type ContextMenuGroupHeadingProps = Omit<WithoutChildrenOrChild<ContextMenu.GroupHeadingProps>, 'class'>

  export type ContextMenuGroup = {
    type: 'group'
    label?: string | undefined
    items: ContextMenuItemTypes[]
    groupProps?: ContextMenuGroupProps | undefined
    headingProps?: ContextMenuGroupHeadingProps | undefined
  }

  export type ContextMenuItemProps = Omit<WithoutChildrenOrChild<ContextMenu.ItemProps>, 'class' | 'onSelect' | 'textValue' | 'disabled'>

  export type ContextMenuItem = {
    type: 'item'
    label: string
    value: string
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemProps?: ContextMenuItemProps | undefined
  }

  export type ContextMenuCheckboxItemProps = Omit<
    WithoutChildrenOrChild<ContextMenu.CheckboxItemProps>,
    'class' | 'value' | 'disabled' | 'checked' | 'onCheckedChange'
  >

  export type ContextMenuCheckboxItem = {
    type: 'checkboxitem'
    label: string
    value: string
    disabled?: boolean | undefined
    checked?: boolean | undefined
    onchange: (checked: boolean) => void
    checkboxItemProps?: ContextMenuCheckboxItemProps | undefined
  }

  export type ContextMenuRadioGroupProps = Omit<WithoutChildrenOrChild<ContextMenu.RadioGroupProps>, 'class' | 'valie' | 'onValueChange'>

  export type ContextMenuRadioGroupHeadingProps = Omit<WithoutChildrenOrChild<ContextMenu.GroupHeadingProps>, 'class'>

  export type ContextMenuRadioGroup = {
    type: 'radiogroup'
    label?: string
    items: ContextMenuRadioItem[]
    value?: string | undefined
    onchange: (value: string) => void
    radioGroupProps?: ContextMenuRadioGroupProps | undefined
    headingProps?: ContextMenuRadioGroupHeadingProps | undefined
  }

  export type ContextMenuRadioItemProps = Omit<WithoutChildrenOrChild<ContextMenu.RadioItemProps>, 'class' | 'value' | 'disabled'>

  export type ContextMenuRadioItem = {
    type: 'radioitem'
    label: string
    value: string
    disabled?: boolean | undefined
    radioItemProps?: ContextMenuRadioItemProps | undefined
  }

  export type ContextMenuSubProps = WithoutChildren<ContextMenu.SubProps>

  export type ContextMenuSubTriggerProps = Omit<WithoutChildrenOrChild<ContextMenu.SubTriggerProps>, 'class'>

  export type ContextMenuSubContentProps = Omit<WithoutChildrenOrChild<ContextMenu.SubContentProps>, 'class' | 'sideOffset'>

  export type ContextMenuSubmenu = {
    type: 'submenu'
    label: string
    items: ContextMenuGroupTypes[]
    icon: string
    submenuProps?: ContextMenuSubProps | undefined
    submenuTriggerProps?: ContextMenuSubTriggerProps | undefined
    submenuContentProps?: ContextMenuSubContentProps | undefined
  }

  export type ContextMenuItemSubmenuProps = WithoutChildren<ContextMenu.SubProps>

  export type ContextMenuItemSubmenuTriggerProps = Omit<WithoutChildrenOrChild<ContextMenu.SubTriggerProps>, 'class' | 'textValue' | 'disabled' | 'onSelect'>

  export type ContextMenuItemSubmenuContentProps = Omit<WithoutChildrenOrChild<ContextMenu.SubContentProps>, 'class' | 'sideOffset'>

  export type ContextMenuItemSubmenu = {
    type: 'itemsubmenu'
    label: string
    value: string
    items: ContextMenuGroupTypes[]
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemSubmenuProps?: ContextMenuItemSubmenuProps | undefined
    itemSubmenuTriggerProps?: ContextMenuItemSubmenuTriggerProps | undefined
    itemSubmenuContentProps?: ContextMenuItemSubmenuContentProps | undefined
  }

  export type ContextMenuItemTypes = ContextMenuItem | ContextMenuCheckboxItem | ContextMenuSubmenu | ContextMenuItemSubmenu

  export type ContextMenuGroupTypes = ContextMenuGroup | ContextMenuRadioGroup

  export type ContextMenuTriggerProps = Omit<WithoutChildrenOrChild<ContextMenu.TriggerProps>, 'class'>

  export type ContextMenuContentProps = Omit<WithoutChildrenOrChild<ContextMenu.ContentProps>, 'class'>

  export type ContextMenuSeparatorProps = Omit<WithoutChildrenOrChild<ContextMenu.SeparatorProps>, 'class'>

  export type ContextMenuProps = ContextMenu.RootProps & {
    groups: ContextMenuGroupTypes[]
    triggerProps?: ContextMenuTriggerProps | undefined
    contentProps?: ContextMenuContentProps | undefined
    separatorProps?: ContextMenuSeparatorProps | undefined
  }
</script>

<script lang="ts">
  import { ContextMenu } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Label from '@renderer/lib/ui/components/Label.svelte'

  let { open = $bindable(false), children, groups, triggerProps, contentProps, separatorProps, ...restProps }: ContextMenuProps = $props()
</script>

<ContextMenu.Root bind:open {...restProps}>
  <ContextMenu.Trigger class={['w-full rounded-md transition-opacity', 'cursor-pointer disabled:cursor-not-allowed', 'disabled:opacity-40']} {...triggerProps}>
    {@render children?.()}
  </ContextMenu.Trigger>

  <ContextMenu.Portal to="#portal">
    <ContextMenu.Content
      class={['min-w-48 z-50 p-1 rounded-md border shadow-xl transition-all', 'outline-none', 'bg-zinc-850 border-zinc-800']}
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
      'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-all',
      'outline-none',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      'data-highlighted:bg-zinc-800'
    ]}
    {...itemProps}
  >
    <Icon {icon} class="w-5 h-5 flex items-center justify-center opacity-40" />
    <span>{label}</span>
  </ContextMenu.Item>
{/snippet}

{#snippet CMCheckboxItem({ label, value, disabled, checked, onchange, checkboxItemProps }: ContextMenuCheckboxItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity">
    <ContextMenu.CheckboxItem
      {value}
      {disabled}
      {checked}
      onCheckedChange={onchange}
      class={[
        'w-5 h-5 flex items-center justify-center rounded-md p-0.5 shadow-xl transition-all',
        'focus-visible:outline-1',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'bg-zinc-800 data-[state=checked]:bg-zinc-750 focus-visible:outline-zinc-800'
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
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity">
    <ContextMenu.RadioItem
      {value}
      {disabled}
      class={[
        'w-5 h-5 flex items-center justify-center rounded-full p-0.5 shadow-xl transition-all',
        'focus-visible:outline-1',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'disabled:opacity-40',
        'bg-zinc-800 data-[state=checked]:bg-zinc-750 focus-visible:outline-zinc-800'
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
        'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-all',
        'outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'data-highlighted:bg-zinc-800'
      ]}
      {...submenuTriggerProps}
    >
      <Icon {icon} class="w-4 h-4 flex items-center justify-center opacity-40" />
      <span>{label}</span>
      <Icon icon="ph:caret-right" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </ContextMenu.SubTrigger>

    <ContextMenu.SubContent
      sideOffset={12}
      class={['min-w-48 z-50 p-1 rounded-md border shadow-xl transition-all', 'outline-none', 'bg-zinc-850 border-zinc-800']}
      {...submenuContentProps}
    >
      {@render CMRenderGroups(items)}
    </ContextMenu.SubContent>
  </ContextMenu.Sub>
{/snippet}

{#snippet CMItemSubmenu({
  label,
  icon,
  value,
  items,
  disabled,
  onselect,
  itemSubmenuProps,
  itemSubmenuTriggerProps,
  itemSubmenuContentProps
}: ContextMenuItemSubmenu)}
  <ContextMenu.Sub {...itemSubmenuProps}>
    <ContextMenu.SubTrigger
      onSelect={onselect}
      {disabled}
      textValue={value}
      class={[
        'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-all',
        'outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'data-highlighted:bg-zinc-800'
      ]}
      {...itemSubmenuTriggerProps}
    >
      <Icon {icon} class="w-4 h-4 flex items-center justify-center opacity-40" />
      <span>{label}</span>
      <Icon icon="ph:caret-right" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </ContextMenu.SubTrigger>

    <ContextMenu.SubContent
      sideOffset={12}
      class={['min-w-48 z-50 p-1 rounded-md border shadow-xl transition-all', 'outline-none', 'bg-zinc-850 border-zinc-800']}
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
      <ContextMenu.Separator class={['w-full h-px my-2', 'bg-zinc-750']} {...separatorProps} />
    {/if}
  {/each}
{/snippet}
