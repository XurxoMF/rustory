<script lang="ts" module>
  import { type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'
  import type { Component } from 'svelte'

  import type { IconProps } from '@renderer/lib/ui/components/Icons/BaseIcon.svelte'

  export type ContextMenuGroupProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.GroupProps>, 'class'>

  export type ContextMenuGroupHeadingProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.GroupHeadingProps>, 'class'>

  export type ContextMenuGroup = {
    type: 'group'
    label?: string | undefined
    items: ContextMenuItemTypes[]
    groupProps?: ContextMenuGroupProps | undefined
    headingProps?: ContextMenuGroupHeadingProps | undefined
  }

  export type ContextMenuItemProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.ItemProps>, 'class' | 'onSelect' | 'textValue' | 'disabled'>

  export type ContextMenuItem = {
    type: 'item'
    label: string
    value: string
    icon: Component<IconProps>
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemProps?: ContextMenuItemProps | undefined
  }

  export type ContextMenuCheckboxItemProps = WithoutKeys<
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

  export type ContextMenuRadioGroupProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.RadioGroupProps>, 'class' | 'valie' | 'onValueChange'>

  export type ContextMenuRadioGroupHeadingProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.GroupHeadingProps>, 'class'>

  export type ContextMenuRadioGroup = {
    type: 'radiogroup'
    label?: string | undefined
    items: ContextMenuRadioItem[]
    value?: string | undefined
    onchange: (value: string) => void
    radioGroupProps?: ContextMenuRadioGroupProps | undefined
    headingProps?: ContextMenuRadioGroupHeadingProps | undefined
  }

  export type ContextMenuRadioItemProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.RadioItemProps>, 'class' | 'value' | 'disabled'>

  export type ContextMenuRadioItem = {
    type: 'radioitem'
    label: string
    value: string
    disabled?: boolean | undefined
    radioItemProps?: ContextMenuRadioItemProps | undefined
  }

  export type ContextMenuSubProps = WithoutChildren<ContextMenu.SubProps>

  export type ContextMenuSubTriggerProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.SubTriggerProps>, 'class'>

  export type ContextMenuSubContentProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.SubContentProps>, 'class' | 'sideOffset'>

  export type ContextMenuSubmenu = {
    type: 'submenu'
    label: string
    items: ContextMenuGroupTypes[]
    icon: Component<IconProps>
    submenuProps?: ContextMenuSubProps | undefined
    submenuTriggerProps?: ContextMenuSubTriggerProps | undefined
    submenuContentProps?: ContextMenuSubContentProps | undefined
  }

  export type ContextMenuItemSubmenuProps = WithoutChildren<ContextMenu.SubProps>

  export type ContextMenuItemSubmenuTriggerProps = WithoutKeys<
    WithoutChildrenOrChild<ContextMenu.SubTriggerProps>,
    'class' | 'textValue' | 'disabled' | 'onSelect'
  >

  export type ContextMenuItemSubmenuContentProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.SubContentProps>, 'class' | 'sideOffset'>

  export type ContextMenuItemSubmenu = {
    type: 'itemsubmenu'
    label: string
    value: string
    items: ContextMenuGroupTypes[]
    icon: Component<IconProps>
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemSubmenuProps?: ContextMenuItemSubmenuProps | undefined
    itemSubmenuTriggerProps?: ContextMenuItemSubmenuTriggerProps | undefined
    itemSubmenuContentProps?: ContextMenuItemSubmenuContentProps | undefined
  }

  export type ContextMenuItemTypes = ContextMenuItem | ContextMenuCheckboxItem | ContextMenuSubmenu | ContextMenuItemSubmenu

  export type ContextMenuGroupTypes = ContextMenuGroup | ContextMenuRadioGroup

  export const CONTEXT_MENU_TRIGGER_HEIGHT_CLASSES = {
    fit: ['h-fit'],
    full: ['h-full'],
    'flex-1': ['flex-1']
  } as const

  export type ContextMenuTriggerHeightClasses = keyof typeof CONTEXT_MENU_TRIGGER_HEIGHT_CLASSES

  export type ContextMenuTriggerProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.TriggerProps>, 'class'>

  export type ContextMenuContentProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.ContentProps>, 'class'>

  export type ContextMenuSeparatorProps = WithoutKeys<WithoutChildrenOrChild<ContextMenu.SeparatorProps>, 'class'>

  export type ContextMenuProps = ContextMenu.RootProps & {
    groups: ContextMenuGroupTypes[]
    triggerHeight?: ContextMenuTriggerHeightClasses | undefined
    triggerProps?: ContextMenuTriggerProps | undefined
    contentProps?: ContextMenuContentProps | undefined
    separatorProps?: ContextMenuSeparatorProps | undefined
  }
</script>

<script lang="ts">
  import { ContextMenu } from 'bits-ui'

  import { PHCaretRightBoldIcon, PHCheckBoldIcon, PHQuestionMarkBoldIcon, PHXBoldIcon } from '@renderer/lib/ui/components/Icons/Phosphor'

  let {
    open = $bindable(false),
    children,
    groups,
    triggerHeight = 'fit',
    triggerProps,
    contentProps,
    separatorProps,
    ...restProps
  }: ContextMenuProps = $props()
</script>

<ContextMenu.Root bind:open {...restProps}>
  <ContextMenu.Trigger
    class={['w-full outline-none', 'cursor-pointer disabled:cursor-not-allowed', ...CONTEXT_MENU_TRIGGER_HEIGHT_CLASSES[triggerHeight]]}
    {...triggerProps}
  >
    {@render children?.()}
  </ContextMenu.Trigger>

  <ContextMenu.Portal to="#portal">
    <ContextMenu.Content
      class={[
        'max-h-(--bits-context-menu-content-available-height) min-w-60 z-200 flex flex-col m-1 backdrop-blur-xs rounded-sm shadow-xl outline-none @container',
        'inset-ring-2',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'bg-zinc-900/95 inset-ring-zinc-800',
        't-light:bg-zinc-100/90 t-light:inset-ring-zinc-300'
      ]}
      {...contentProps}
    >
      {@render CMRenderGroups(groups)}
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>

{#snippet CMGroup({ label, items, groupProps, headingProps }: ContextMenuGroup)}
  <ContextMenu.Group class={['flex flex-col p-2']} {...groupProps}>
    {#if label}
      <ContextMenu.GroupHeading class={['text-current/50 text-sm font-medium ml-9 my-2']} {...headingProps}>{label}</ContextMenu.GroupHeading>
    {/if}

    {@render CMRenderItems(items)}
  </ContextMenu.Group>
{/snippet}

{#snippet CMItem({ label, value, icon: Icon, disabled, onselect, itemProps }: ContextMenuItem)}
  <ContextMenu.Item
    onSelect={onselect}
    {disabled}
    textValue={value}
    class={[
      'relative w-full flex items-center justify-between p-2 pl-9 font-medium rounded-sm outline-none',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      'not-data-disabled:hover:bg-zinc-800 ddata-highlighted:bg-zinc-800',
      't-light:not-data-disabled:hover:bg-zinc-300 t-light:ddata-highlighted:bg-zinc-300'
    ]}
    {...itemProps}
  >
    {#if Icon}
      <Icon class="absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center text-lg text-current/50" />
    {/if}
    <span>{label}</span>
  </ContextMenu.Item>
{/snippet}

{#snippet CMCheckboxItem({ label, value, disabled, checked, onchange, checkboxItemProps }: ContextMenuCheckboxItem)}
  <div class="relative w-full flex items-center justify-start p-2 pl-9 font-medium rounded-sm">
    <ContextMenu.CheckboxItem
      {value}
      {disabled}
      {checked}
      onCheckedChange={onchange}
      class={[
        'absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center rounded-sm p-1 outline-none',
        'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
        'data-[state=unchecked]:not-hover:text-current/20',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 not-data-disabled:data-[state=checked]:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800',
        't-light:bg-zinc-300/50 t-light:not-data-disabled:hover:bg-zinc-300 t-light:data-[state=checked]:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300'
      ]}
      {...checkboxItemProps}
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
    </ContextMenu.CheckboxItem>

    <span class={['text-current/50', disabled && 'opacity-40']}>{label}</span>
  </div>
{/snippet}

{#snippet CMRadioGroup({ label, value, items, onchange, radioGroupProps, headingProps }: ContextMenuRadioGroup)}
  <ContextMenu.RadioGroup {value} onValueChange={onchange} class={['flex flex-col p-2']} {...radioGroupProps}>
    {#if label}
      <ContextMenu.GroupHeading class={['text-current/50 font-medium text-sm ml-9 my-2']} {...headingProps}>{label}</ContextMenu.GroupHeading>
    {/if}

    {#each items as item}
      {@render CMRadioItem(item)}
    {/each}
  </ContextMenu.RadioGroup>
{/snippet}

{#snippet CMRadioItem({ label, value, disabled, radioItemProps }: ContextMenuRadioItem)}
  <div class="relative w-full flex items-center justify-start p-2 pl-9 font-medium text-current/50 rounded-sm">
    <ContextMenu.RadioItem
      {value}
      {disabled}
      class={[
        'absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-5 h-5 flex items-center justify-center rounded-full p-1 outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'inset-ring-2 focus-visible:inset-ring-1 data-[state=checked]:inset-ring-4 focus-visible:ring-2',
        'data-disabled:opacity-40',
        'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 data-[state=checked]:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800 data-[state=checked]:inset-ring-zinc-200 data-[state=checked]:ring-zinc-200',
        't-light:bg-zinc-300/50 t-light:not-data-disabled:hover:bg-zinc-300 t-light:data-[state=checked]:bg-zinc-300 t-light:inset-ring-zinc-300 t-light:ring-zinc-300 t-light:data-[state=checked]:inset-ring-zinc-800 t-light:data-[state=checked]:ring-zinc-800'
      ]}
      {...radioItemProps}
    />

    <span class={['font-medium', disabled && 'opacity-40']}>{label}</span>
  </div>
{/snippet}

{#snippet CMSubmenu({ label, icon: Icon, items, submenuProps, submenuTriggerProps, submenuContentProps }: ContextMenuSubmenu)}
  <ContextMenu.Sub {...submenuProps}>
    <ContextMenu.SubTrigger
      class={[
        'relative w-full flex items-center justify-between p-2 pl-9 font-medium rounded-sm outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'not-data-disabled:hover:bg-zinc-800 ddata-highlighted:bg-zinc-800',
        't-light:not-data-disabled:hover:bg-zinc-300 t-light:ddata-highlighted:bg-zinc-300'
      ]}
      {...submenuTriggerProps}
    >
      {#if Icon}
        <Icon class="absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center text-lg text-current/50" />
      {/if}
      <span>{label}</span>
      <PHCaretRightBoldIcon class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </ContextMenu.SubTrigger>

    <ContextMenu.SubContent
      sideOffset={8}
      class={[
        'max-h-screen min-w-60 z-200 flex flex-col m-1 backdrop-blur-xs rounded-sm shadow-xl outline-none @container',
        'inset-ring-2',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'bg-zinc-900/95 inset-ring-zinc-800',
        't-light:bg-zinc-100/90 t-light:inset-ring-zinc-300'
      ]}
      {...submenuContentProps}
    >
      {@render CMRenderGroups(items)}
    </ContextMenu.SubContent>
  </ContextMenu.Sub>
{/snippet}

{#snippet CMItemSubmenu({
  label,
  icon: Icon,
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
        'relative w-full flex items-center justify-between p-2 pl-9 font-medium rounded-sm outline-none',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'not-data-disabled:hover:bg-zinc-800 ddata-highlighted:bg-zinc-800',
        't-light:not-data-disabled:hover:bg-zinc-300 t-light:ddata-highlighted:bg-zinc-300'
      ]}
      {...itemSubmenuTriggerProps}
    >
      {#if Icon}
        <Icon class="absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center text-lg text-current/50" />
      {/if}
      <span>{label}</span>
      <PHCaretRightBoldIcon class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </ContextMenu.SubTrigger>

    <ContextMenu.SubContent
      sideOffset={8}
      class={[
        'max-h-screen min-w-60 z-200 flex flex-col m-1 backdrop-blur-xs rounded-sm shadow-xl outline-none @container',
        'inset-ring-2',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'bg-zinc-900/95 inset-ring-zinc-800',
        't-light:bg-zinc-100/90 t-light:inset-ring-zinc-300'
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
      <ContextMenu.Separator class={['w-full h-px', 'bg-zinc-800', 't-light:bg-zinc-300']} {...separatorProps} />
    {/if}
  {/each}
{/snippet}
