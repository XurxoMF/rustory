<script lang="ts" module>
  import { type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  export type DropdownMenuGroupProps = Omit<WithoutChildrenOrChild<DropdownMenu.GroupProps>, 'class'>

  export type DropdownMenuGroupHeadingProps = Omit<WithoutChildrenOrChild<DropdownMenu.GroupHeadingProps>, 'class'>

  export type DropdownMenuGroup = {
    type: 'group'
    label?: string | undefined
    items: DropdownMenuItemTypes[]
    groupProps?: DropdownMenuGroupProps | undefined
    headingProps?: DropdownMenuGroupHeadingProps | undefined
  }

  export type DropdownMenuItemProps = Omit<WithoutChildrenOrChild<DropdownMenu.ItemProps>, 'class' | 'onSelect' | 'textValue' | 'disabled'>

  export type DropdownMenuItem = {
    type: 'item'
    label: string
    value: string
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemProps?: DropdownMenuItemProps | undefined
  }

  export type DropdownMenuCheckboxItemProps = Omit<
    WithoutChildrenOrChild<DropdownMenu.CheckboxItemProps>,
    'class' | 'value' | 'disabled' | 'checked' | 'onCheckedChange'
  >

  export type DropdownMenuCheckboxItem = {
    type: 'checkboxitem'
    label: string
    value: string
    disabled?: boolean | undefined
    checked?: boolean | undefined
    onchange: (checked: boolean) => void
    checkboxItemProps?: DropdownMenuCheckboxItemProps | undefined
  }

  export type DropdownMenuRadioGroupProps = Omit<WithoutChildrenOrChild<DropdownMenu.RadioGroupProps>, 'class' | 'valie' | 'onValueChange'>

  export type DropdownMenuRadioGroupHeadingProps = Omit<WithoutChildrenOrChild<DropdownMenu.GroupHeadingProps>, 'class'>

  export type DropdownMenuRadioGroup = {
    type: 'radiogroup'
    label?: string
    items: DropdownMenuRadioItem[]
    value?: string | undefined
    onchange: (value: string) => void
    radioGroupProps?: DropdownMenuRadioGroupProps | undefined
    headingProps?: DropdownMenuRadioGroupHeadingProps | undefined
  }

  export type DropdownMenuRadioItemProps = Omit<WithoutChildrenOrChild<DropdownMenu.RadioItemProps>, 'class' | 'value' | 'disabled'>

  export type DropdownMenuRadioItem = {
    type: 'radioitem'
    label: string
    value: string
    disabled?: boolean | undefined
    radioItemProps?: DropdownMenuRadioItemProps | undefined
  }

  export type DropdownMenuSubProps = WithoutChildren<DropdownMenu.SubProps>

  export type DropdownMenuSubTriggerProps = Omit<WithoutChildrenOrChild<DropdownMenu.SubTriggerProps>, 'class'>

  export type DropdownMenuSubContentProps = Omit<WithoutChildrenOrChild<DropdownMenu.SubContentProps>, 'class' | 'sideOffset'>

  export type DropdownMenuSubmenu = {
    type: 'submenu'
    label: string
    items: DropdownMenuGroupTypes[]
    icon: string
    submenuProps?: DropdownMenuSubProps | undefined
    submenuTriggerProps?: DropdownMenuSubTriggerProps | undefined
    submenuContentProps?: DropdownMenuSubContentProps | undefined
  }

  export type DropdownMenuItemSubmenuProps = WithoutChildren<DropdownMenu.SubProps>

  export type DropdownMenuItemSubmenuTriggerProps = Omit<WithoutChildrenOrChild<DropdownMenu.SubTriggerProps>, 'class' | 'textValue' | 'disabled' | 'onSelect'>

  export type DropdownMenuItemSubmenuContentProps = Omit<WithoutChildrenOrChild<DropdownMenu.SubContentProps>, 'class' | 'sideOffset'>

  export type DropdownMenuItemSubmenu = {
    type: 'itemsubmenu'
    label: string
    value: string
    items: DropdownMenuGroupTypes[]
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemSubmenuProps?: DropdownMenuItemSubmenuProps | undefined
    itemSubmenuTriggerProps?: DropdownMenuItemSubmenuTriggerProps | undefined
    itemSubmenuContentProps?: DropdownMenuItemSubmenuContentProps | undefined
  }

  export type DropdownMenuItemTypes = DropdownMenuItem | DropdownMenuCheckboxItem | DropdownMenuSubmenu | DropdownMenuItemSubmenu

  export type DropdownMenuGroupTypes = DropdownMenuGroup | DropdownMenuRadioGroup

  export const DROPDOWN_MENU_TRIGGER_MODE_CLASSES = {
    transparent: ['focus-visible:inset-ring-1 focus-visible:ring-2', 'not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'],
    neutral: [
      'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
      'bg-zinc-800/50 not-disabled:hover:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
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

  export type DropdownMenuTriggerModeTypes = keyof typeof DROPDOWN_MENU_TRIGGER_MODE_CLASSES

  export const DROPDOWN_MENU_TRIGGER_WIDTH_CLASSES = {
    fit: ['w-fit'],
    full: ['w-full'],
    'flex-1': ['flex-1']
  } as const

  export type DropdownMenuTriggerWidthClasses = keyof typeof DROPDOWN_MENU_TRIGGER_WIDTH_CLASSES

  export const DROPDOWN_MENU_TRIGGER_ALIGN_CLASSES = {
    start: ['justify-start'],
    center: ['justify-center'],
    end: ['justify-end']
  } as const

  export type DropdownMenuTriggerAlignClasses = keyof typeof DROPDOWN_MENU_TRIGGER_ALIGN_CLASSES

  export type DropdownMenuTriggerProps = Omit<WithoutChildrenOrChild<DropdownMenu.TriggerProps>, 'class'>

  export type DropdownMenuContentProps = Omit<WithoutChildrenOrChild<DropdownMenu.ContentProps>, 'class' | 'sideOffset'>

  export type DropdownMenuArrowProps = Omit<WithoutChildrenOrChild<DropdownMenu.ArrowProps>, 'class'>

  export type DropdownMenuSeparatorProps = Omit<WithoutChildrenOrChild<DropdownMenu.SeparatorProps>, 'class'>

  export type DropdownMenuProps = Omit<DropdownMenu.RootProps, 'class'> & {
    groups: DropdownMenuGroupTypes[]
    mode?: DropdownMenuTriggerModeTypes | undefined
    triggerWidth?: DropdownMenuTriggerWidthClasses | undefined
    triggerAlign?: DropdownMenuTriggerAlignClasses | undefined
    triggerProps?: DropdownMenuTriggerProps | undefined
    contentProps?: DropdownMenuContentProps | undefined
    arrowProps?: DropdownMenuArrowProps | undefined
    separatorProps?: DropdownMenuSeparatorProps | undefined
  }
</script>

<script lang="ts">
  import { DropdownMenu } from 'bits-ui'

  import Icon from '@renderer/lib/ui/components/Icon.svelte'

  let {
    open = $bindable(false),
    groups,
    mode = 'neutral',
    triggerWidth = 'fit',
    triggerAlign = 'center',
    children,
    triggerProps,
    contentProps,
    arrowProps,
    separatorProps,
    ...restProps
  }: DropdownMenuProps = $props()
</script>

<DropdownMenu.Root bind:open {...restProps}>
  <DropdownMenu.Trigger
    class={[
      'shrink-0 min-w-9 min-h-9 flex items-center justify-center gap-2 p-2 leading-tight rounded-sm outline-none transition-colors',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      ...DROPDOWN_MENU_TRIGGER_MODE_CLASSES[mode],
      ...DROPDOWN_MENU_TRIGGER_WIDTH_CLASSES[triggerWidth],
      ...DROPDOWN_MENU_TRIGGER_ALIGN_CLASSES[triggerAlign]
    ]}
    {...triggerProps}
  >
    {@render children?.()}
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal to="#portal">
    <DropdownMenu.Content
      class={[
        'max-h-(--bits-context-menu-content-available-height) min-w-60 z-200 flex flex-col m-1 backdrop-blur-xs rounded-sm shadow-xl outline-none transition-colors @container',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        'bg-zinc-900/95 inset-ring-zinc-800'
      ]}
      {...contentProps}
    >
      {@render DRenderGroups(groups)}

      <DropdownMenu.Arrow class={['transition-colors', 'text-zinc-800']} {...arrowProps} />
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>

{#snippet DMGroup({ label, items, groupProps, headingProps }: DropdownMenuGroup)}
  <DropdownMenu.Group class={['flex flex-col p-2']} {...groupProps}>
    {#if label}
      <DropdownMenu.GroupHeading class={['text-current/50 font-medium text-sm ml-9 my-2']} {...headingProps}>{label}</DropdownMenu.GroupHeading>
    {/if}

    {@render DRenderItems(items)}
  </DropdownMenu.Group>
{/snippet}

{#snippet DMItem({ label, value, icon, disabled, onselect, itemProps }: DropdownMenuItem)}
  <DropdownMenu.Item
    onSelect={onselect}
    {disabled}
    textValue={value}
    class={[
      'relative w-full flex items-center justify-between p-2 pl-9 font-medium rounded-sm outline-none transition-colors',
      'cursor-pointer data-disabled:cursor-not-allowed',
      'data-disabled:opacity-40',
      'not-data-disabled:hover:bg-zinc-800 data-highlighted:bg-zinc-800'
    ]}
    {...itemProps}
  >
    {#if icon}
      <Icon {icon} class="absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center text-lg text-current/50" />
    {/if}
    <span class="leading-tight">{label}</span>
  </DropdownMenu.Item>
{/snippet}

{#snippet DMCheckboxItem({ label, value, disabled, checked, onchange, checkboxItemProps }: DropdownMenuCheckboxItem)}
  <div class="relative shrink-0 w-full flex items-center justify-start p-2 pl-9 font-medium text-current/50 rounded-sm transition-opacity">
    <DropdownMenu.CheckboxItem
      {value}
      {disabled}
      {checked}
      onCheckedChange={onchange}
      class={[
        'absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center rounded-sm p-1 outline-none transition-colors',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'inset-ring-2 focus-visible:inset-ring-1 focus-visible:ring-2',
        'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 not-data-disabled:data-[state=checked]:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800'
      ]}
      {...checkboxItemProps}
    >
      {#snippet children({ checked, indeterminate })}
        <Icon icon={indeterminate ? 'ph:question-mark-bold' : checked ? 'ph:check-bold' : 'ph:x-bold'} />
      {/snippet}
    </DropdownMenu.CheckboxItem>

    <span class={['leading-tight', disabled && 'opacity-40']}>{label}</span>
  </div>
{/snippet}

{#snippet DMRadioGroup({ label, value, items, onchange, radioGroupProps, headingProps }: DropdownMenuRadioGroup)}
  <DropdownMenu.RadioGroup {value} onValueChange={onchange} class={['flex flex-col p-2']} {...radioGroupProps}>
    {#if label}
      <DropdownMenu.GroupHeading class={['text-current/50 font-medium text-sm ml-9 my-2']} {...headingProps}>{label}</DropdownMenu.GroupHeading>
    {/if}

    {#each items as item}
      {@render DMRadioItem(item)}
    {/each}
  </DropdownMenu.RadioGroup>
{/snippet}

{#snippet DMRadioItem({ label, value, disabled, radioItemProps }: DropdownMenuRadioItem)}
  <div class="relative shrink-0 w-full flex items-center justify-start p-2 pl-9 font-medium text-current/50 rounded-sm transition-opacity">
    <DropdownMenu.RadioItem
      {value}
      {disabled}
      class={[
        'absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-5 h-5 flex items-center justify-center rounded-full p-1 outline-none transition-colors',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'inset-ring-2 focus-visible:inset-ring-1 data-[state=checked]:inset-ring-4 focus-visible:ring-2',
        'bg-zinc-800/50 not-data-disabled:hover:bg-zinc-800 data-[state=checked]:bg-zinc-800 inset-ring-zinc-800 ring-zinc-800 data-[state=checked]:inset-ring-zinc-200 data-[state=checked]:ring-zinc-200'
      ]}
      {...radioItemProps}
    />

    <span class={['leading-tight', disabled && 'opacity-40']}>{label}</span>
  </div>
{/snippet}

{#snippet DMSubmenu({ label, icon, items, submenuProps, submenuTriggerProps, submenuContentProps }: DropdownMenuSubmenu)}
  <DropdownMenu.Sub {...submenuProps}>
    <DropdownMenu.SubTrigger
      class={[
        'relative w-full flex items-center justify-between p-2 pl-9 font-medium rounded-sm outline-none transition-colors',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'not-data-disabled:hover:bg-zinc-800 data-highlighted:bg-zinc-800'
      ]}
      {...submenuTriggerProps}
    >
      {#if icon}
        <Icon {icon} class="absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center text-lg text-current/50" />
      {/if}
      <span class="leading-tight">{label}</span>
      <Icon icon="ph:caret-right-bold" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </DropdownMenu.SubTrigger>

    <DropdownMenu.SubContent
      sideOffset={8}
      class={[
        'max-h-screen min-w-60 z-200 flex flex-col m-1 backdrop-blur-xs rounded-sm shadow-xl outline-none transition-colors @container',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        'bg-zinc-900/95 inset-ring-zinc-800'
      ]}
      {...submenuContentProps}
    >
      {@render DRenderGroups(items)}
    </DropdownMenu.SubContent>
  </DropdownMenu.Sub>
{/snippet}

{#snippet DItemSubmenu({
  label,
  icon,
  value,
  items,
  disabled,
  onselect,
  itemSubmenuProps,
  itemSubmenuTriggerProps,
  itemSubmenuContentProps
}: DropdownMenuItemSubmenu)}
  <DropdownMenu.Sub {...itemSubmenuProps}>
    <DropdownMenu.SubTrigger
      onSelect={onselect}
      {disabled}
      textValue={value}
      class={[
        'relative w-full flex items-center justify-between p-2 pl-9 font-medium rounded-sm outline-none transition-colors',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        'not-data-disabled:hover:bg-zinc-800 data-highlighted:bg-zinc-800'
      ]}
      {...itemSubmenuTriggerProps}
    >
      {#if icon}
        <Icon {icon} class="absolute left-1 top-1/2 -translate-y-1/2 shrink-0 w-6 h-6 flex items-center justify-center text-lg text-current/50" />
      {/if}
      <span class="leading-tight">{label}</span>
      <Icon icon="ph:caret-right-bold" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </DropdownMenu.SubTrigger>

    <DropdownMenu.SubContent
      sideOffset={8}
      class={[
        'max-h-screen min-w-60 z-200 flex flex-col m-1 backdrop-blur-xs rounded-sm shadow-xl outline-none transition-colors @container',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'inset-ring-2',
        'bg-zinc-900/95 inset-ring-zinc-800'
      ]}
      {...itemSubmenuContentProps}
    >
      {@render DRenderGroups(items)}
    </DropdownMenu.SubContent>
  </DropdownMenu.Sub>
{/snippet}

{#snippet DRenderItems(items: DropdownMenuItemTypes[])}
  {#each items as item}
    {#if item.type === 'item'}
      {@render DMItem(item)}
    {:else if item.type === 'checkboxitem'}
      {@render DMCheckboxItem(item)}
    {:else if item.type === 'submenu'}
      {@render DMSubmenu(item)}
    {:else if item.type === 'itemsubmenu'}
      {@render DItemSubmenu(item)}
    {/if}
  {/each}
{/snippet}

{#snippet DRenderGroups(groups: DropdownMenuGroupTypes[])}
  {#each groups as group, i}
    {#if group.type === 'group'}
      {@render DMGroup(group)}
    {:else if group.type === 'radiogroup'}
      {@render DMRadioGroup(group)}
    {/if}

    {#if i < groups.length - 1}
      <DropdownMenu.Separator class={['w-full h-px', 'bg-zinc-800']} {...separatorProps} />
    {/if}
  {/each}
{/snippet}
