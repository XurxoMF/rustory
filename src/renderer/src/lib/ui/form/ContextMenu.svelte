<script lang="ts">
  import { ContextMenu, type WithoutChild } from 'bits-ui'
  import { fade } from 'svelte/transition'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { StyledContainer, StaticContainer } from '@renderer/lib/ui/layout/Containers'
  import Label from '@renderer/lib/ui/form/Label.svelte'

  type ContextMenuGroup = {
    type: 'group'
    label?: string | undefined
    items: ContextMenuItemTypes[]
  }

  type ContextMenuItem = {
    type: 'item'
    label: string
    value: string
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
  }

  type ContextMenuCheckboxItem = {
    type: 'checkboxitem'
    label: string
    value: string
    disabled?: boolean | undefined
    checked?: boolean | undefined
    onchange: (checked: boolean) => void
  }

  type ContextMenuRadioGroup = {
    type: 'radiogroup'
    label?: string
    items: ContextMenuRadioItem[]
    value?: string | undefined
    onchange: (value: string) => void
  }

  type ContextMenuRadioItem = {
    type: 'radioitem'
    label: string
    value: string
    disabled?: boolean | undefined
  }

  type ContextMenuSubmenu = {
    type: 'submenu'
    label: string
    items: ContextMenuGroupTypes[]
    icon: string
  }

  type ContextMenuItemSubmenu = {
    type: 'itemsubmenu'
    label: string
    value: string
    items: ContextMenuGroupTypes[]
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
  }

  type ContextMenuItemTypes = ContextMenuItem | ContextMenuCheckboxItem | ContextMenuSubmenu | ContextMenuItemSubmenu

  type ContextMenuGroupTypes = ContextMenuGroup | ContextMenuRadioGroup

  type ContextMenuProps = ContextMenu.RootProps & {
    groups: ContextMenuGroupTypes[]
    contentProps?: WithoutChild<ContextMenu.ContentProps>
  }

  let { open = $bindable(false), children, groups, contentProps, ...restProps }: ContextMenuProps = $props()
</script>

<ContextMenu.Root bind:open {...restProps}>
  <ContextMenu.Trigger class={['h-full w-full flex items-center justify-center rounded-md transition-opacity duration-200', 'cursor-pointer disabled:cursor-not-allowed', 'disabled:opacity-40']}>
    {@render children?.()}
  </ContextMenu.Trigger>

  <ContextMenu.Portal to="#portal">
    <ContextMenu.Content class="min-w-48 outline-none z-50" {...contentProps} forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer padding={2}>
                  {@render CMRenderGroups(groups)}
                </StaticContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>

{#snippet CMGroup({ label, items }: ContextMenuGroup)}
  <ContextMenu.Group>
    {#if label}
      <ContextMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']}>{label}</ContextMenu.GroupHeading>
    {/if}

    {@render CMRenderItems(items)}
  </ContextMenu.Group>
{/snippet}

{#snippet CMItem({ label, value, icon, disabled, onselect }: ContextMenuItem)}
  <ContextMenu.Item
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
    onSelect={onselect}
    {disabled}
    textValue={value}
  >
    <Icon {icon} class="w-5 h-5 flex items-center justify-center opacity-40" />
    <span>{label}</span>
  </ContextMenu.Item>
{/snippet}

{#snippet CMCheckboxItem({ label, value, disabled, checked, onchange }: ContextMenuCheckboxItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity duration-200">
    <ContextMenu.CheckboxItem
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
      {value}
      {disabled}
      {checked}
      onCheckedChange={onchange}
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

{#snippet CMRadioItem({ label, value, disabled }: ContextMenuRadioItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity duration-200">
    <ContextMenu.RadioItem
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
      {value}
      {disabled}
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

{#snippet CMRadioGroup({ label, value, items, onchange }: ContextMenuRadioGroup)}
  <ContextMenu.RadioGroup {value} onValueChange={onchange}>
    {#if label}
      <ContextMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']}>{label}</ContextMenu.GroupHeading>
    {/if}

    {#each items as item}
      {@render CMRadioItem(item)}
    {/each}
  </ContextMenu.RadioGroup>
{/snippet}

{#snippet CMSubmenu({ label, icon, items }: ContextMenuSubmenu)}
  <ContextMenu.Sub>
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
    >
      <Icon {icon} class="w-4 h-4 flex items-center justify-center opacity-40" />
      <span>{label}</span>
      <Icon icon="ph:caret-right-bold" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </ContextMenu.SubTrigger>

    <ContextMenu.SubContent sideOffset={12} class="min-w-48 outline-none z-50" forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer padding={2}>
                  {@render CMRenderGroups(items)}
                </StaticContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
    </ContextMenu.SubContent>
  </ContextMenu.Sub>
{/snippet}

{#snippet CMItemSubmenu({ label, icon, value, items, disabled, onselect }: ContextMenuItemSubmenu)}
  <ContextMenu.Sub>
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
      onSelect={onselect}
      textValue={value}
      {disabled}
    >
      <Icon {icon} class="w-4 h-4 flex items-center justify-center opacity-40" />
      <span>{label}</span>
      <Icon icon="ph:caret-right-bold" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </ContextMenu.SubTrigger>

    <ContextMenu.SubContent sideOffset={12} class="min-w-48 outline-none z-50" forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer padding={2}>
                  {@render CMRenderGroups(items)}
                </StaticContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
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
      <ContextMenu.Separator class={['w-full h-px my-2', 't-dark:bg-zinc-750', 't-light:bg-zinc-350', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} />
    {/if}
  {/each}
{/snippet}
