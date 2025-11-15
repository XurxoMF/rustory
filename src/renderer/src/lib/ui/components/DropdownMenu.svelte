<script lang="ts">
  import { DropdownMenu, type WithoutChildren, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import Label from '@renderer/lib/ui/components/Label.svelte'

  type DropdownMenuGroup = {
    type: 'group'
    label?: string | undefined
    items: DropdownMenuItemTypes[]
    groupProps?: Omit<WithoutChildrenOrChild<DropdownMenu.GroupProps>, 'class'> | undefined
    headingProps?: Omit<WithoutChildrenOrChild<DropdownMenu.GroupHeadingProps>, 'class'> | undefined
  }

  type DropdownMenuItem = {
    type: 'item'
    label: string
    value: string
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemProps?: Omit<WithoutChildrenOrChild<DropdownMenu.ItemProps>, 'class' | 'onSelect' | 'textValue' | 'disabled'> | undefined
  }

  type DropdownMenuCheckboxItem = {
    type: 'checkboxitem'
    label: string
    value: string
    disabled?: boolean | undefined
    checked?: boolean | undefined
    onchange: (checked: boolean) => void
    checkboxItemProps?: Omit<WithoutChildrenOrChild<DropdownMenu.CheckboxItemProps>, 'class' | 'value' | 'disabled' | 'checked' | 'onCheckedChange'> | undefined
  }

  type DropdownMenuRadioGroup = {
    type: 'radiogroup'
    label?: string
    items: DropdownMenuRadioItem[]
    value?: string | undefined
    onchange: (value: string) => void
    radioGroupProps?: Omit<WithoutChildrenOrChild<DropdownMenu.RadioGroupProps>, 'class' | 'valie' | 'onValueChange'> | undefined
    headingProps?: Omit<WithoutChildrenOrChild<DropdownMenu.GroupHeadingProps>, 'class'> | undefined
  }

  type DropdownMenuRadioItem = {
    type: 'radioitem'
    label: string
    value: string
    disabled?: boolean | undefined
    radioItemProps?: Omit<WithoutChildrenOrChild<DropdownMenu.RadioItemProps>, 'class' | 'value' | 'disabled'> | undefined
  }

  type DropdownMenuSubmenu = {
    type: 'submenu'
    label: string
    items: DropdownMenuGroupTypes[]
    icon: string
    submenuProps?: WithoutChildren<DropdownMenu.SubProps> | undefined
    submenuTriggerProps?: Omit<WithoutChildrenOrChild<DropdownMenu.SubTriggerProps>, 'class'> | undefined
    submenuContentProps?: Omit<WithoutChildrenOrChild<DropdownMenu.SubContentProps>, 'class' | 'sideOffset'> | undefined
  }

  type DropdownMenuItemSubmenu = {
    type: 'itemsubmenu'
    label: string
    value: string
    items: DropdownMenuGroupTypes[]
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
    itemSubmenuProps?: WithoutChildren<DropdownMenu.SubProps> | undefined
    itemSubmenuTriggerProps?: Omit<WithoutChildrenOrChild<DropdownMenu.SubTriggerProps>, 'class' | 'textValue' | 'disabled' | 'onSelect'> | undefined
    itemSubmenuContentProps?: Omit<WithoutChildrenOrChild<DropdownMenu.SubContentProps>, 'class' | 'sideOffset'> | undefined
  }

  type DropdownMenuItemTypes = DropdownMenuItem | DropdownMenuCheckboxItem | DropdownMenuSubmenu | DropdownMenuItemSubmenu

  type DropdownMenuGroupTypes = DropdownMenuGroup | DropdownMenuRadioGroup

  type DropdownMenuProps = Omit<DropdownMenu.RootProps, 'class'> & {
    groups: DropdownMenuGroupTypes[]
    triggerProps?: Omit<WithoutChildrenOrChild<DropdownMenu.TriggerProps>, 'class'> | undefined
    contentProps?: Omit<WithoutChildrenOrChild<DropdownMenu.ContentProps>, 'class' | 'sideOffset'> | undefined
    arrowProps?: Omit<WithoutChildrenOrChild<DropdownMenu.ArrowProps>, 'class'> | undefined
    separatorProps?: Omit<WithoutChildrenOrChild<DropdownMenu.SeparatorProps>, 'class'> | undefined
  }

  let { open = $bindable(false), groups, children, triggerProps, contentProps, arrowProps, separatorProps, ...restProps }: DropdownMenuProps = $props()
</script>

<DropdownMenu.Root bind:open {...restProps}>
  <DropdownMenu.Trigger
    class={[
      'rounded-md transition-opacity duration-100',
      'focus-visible:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      't-dark:not-disabled:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-800',
      't-light:not-disabled:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
      't-rust:not-disabled:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
      't-midnight:not-disabled:hover:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
    ]}
    {...triggerProps}
  >
    {@render children?.()}
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal to="#portal">
    <DropdownMenu.Content
      sideOffset={4}
      class={[
        'min-w-48 z-50 p-1 rounded-md border shadow/20 transition-[border,background-color] duration-100',
        'outline-none',
        't-dark:bg-zinc-850 t-dark:border-zinc-800',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-800',
        't-midnight:bg-gray-850 t-midnight:border-gray-800'
      ]}
      {...contentProps}
    >
      {@render DRenderGroups(groups)}

      <DropdownMenu.Arrow
        class={['transition-[color] duration-100', 't-dark:text-zinc-750', 't-light:text-zinc-300', 't-rust:text-rust-750', 't-midnight:text-gray-750']}
        {...arrowProps}
      />
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>

{#snippet DMGroup({ label, items, groupProps, headingProps }: DropdownMenuGroup)}
  <DropdownMenu.Group {...groupProps}>
    {#if label}
      <DropdownMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']} {...headingProps}>{label}</DropdownMenu.GroupHeading>
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
      'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity,background-color] duration-100',
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
  </DropdownMenu.Item>
{/snippet}

{#snippet DMCheckboxItem({ label, value, disabled, checked, onchange, checkboxItemProps }: DropdownMenuCheckboxItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity duration-100">
    <DropdownMenu.CheckboxItem
      {value}
      {disabled}
      {checked}
      onCheckedChange={onchange}
      class={[
        'w-5 h-5 flex items-center justify-center rounded-md p-0.5 shadow/20 transition-[opacity,background-color] duration-100',
        'focus-visible:outline-1',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'data-disabled:opacity-40',
        't-dark:bg-zinc-800 t-dark:data-[state=checked]:bg-zinc-750 t-dark:focus-visible:outline-zinc-800',
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
    </DropdownMenu.CheckboxItem>
    <Label {disabled}>{label}</Label>
  </div>
{/snippet}

{#snippet DMRadioGroup({ label, value, items, onchange, radioGroupProps, headingProps }: DropdownMenuRadioGroup)}
  <DropdownMenu.RadioGroup {value} onValueChange={onchange} {...radioGroupProps}>
    {#if label}
      <DropdownMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']} {...headingProps}>{label}</DropdownMenu.GroupHeading>
    {/if}

    {#each items as item}
      {@render DMRadioItem(item)}
    {/each}
  </DropdownMenu.RadioGroup>
{/snippet}

{#snippet DMRadioItem({ label, value, disabled, radioItemProps }: DropdownMenuRadioItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity duration-100">
    <DropdownMenu.RadioItem
      {value}
      {disabled}
      class={[
        'w-5 h-5 flex items-center justify-center rounded-full p-0.5 shadow/20 transition-[opacity,background-color] duration-100',
        'focus-visible:outline-1',
        'cursor-pointer data-disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:bg-zinc-800 t-dark:data-[state=checked]:bg-zinc-750 t-dark:focus-visible:outline-zinc-800',
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
    </DropdownMenu.RadioItem>
    <Label {disabled}>{label}</Label>
  </div>
{/snippet}

{#snippet DMSubmenu({ label, icon, items, submenuProps, submenuTriggerProps, submenuContentProps }: DropdownMenuSubmenu)}
  <DropdownMenu.Sub {...submenuProps}>
    <DropdownMenu.SubTrigger
      class={[
        'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity,background-color] duration-100',
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
    </DropdownMenu.SubTrigger>

    <DropdownMenu.SubContent
      sideOffset={12}
      class={[
        'min-w-48 z-50 p-1 rounded-md border shadow/20 transition-[border,background-color] duration-100',
        'outline-none',
        't-dark:bg-zinc-850 t-dark:border-zinc-800',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-800',
        't-midnight:bg-gray-850 t-midnight:border-gray-800'
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
        'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity,background-color] duration-100',
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
    </DropdownMenu.SubTrigger>

    <DropdownMenu.SubContent
      sideOffset={12}
      class={[
        'min-w-48 z-50 p-1 rounded-md border shadow/20 transition-[border,background-color] duration-100',
        'outline-none',
        't-dark:bg-zinc-850 t-dark:border-zinc-800',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-800',
        't-midnight:bg-gray-850 t-midnight:border-gray-800'
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
      <DropdownMenu.Separator
        class={['w-full h-px my-2', 't-dark:bg-zinc-750', 't-light:bg-zinc-350', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']}
        {...separatorProps}
      />
    {/if}
  {/each}
{/snippet}
