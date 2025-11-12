<script lang="ts">
  import { DropdownMenu, type WithoutChild } from 'bits-ui'
  import { fade } from 'svelte/transition'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { StyledContainer, StaticContainer } from '@renderer/lib/ui/layout/Containers'
  import Label from '@renderer/lib/ui/form/Label.svelte'

  const ROUNDED_CLASSES = {
    regular: ['rounded-md'],
    circle: ['rounded-full']
  } as const

  type RoundedTypes = keyof typeof ROUNDED_CLASSES

  const SIZE_CLASSES = {
    regular: ['h-9 w-fit'],
    square: ['h-9 w-9'],
    none: ['h-fit w-fit']
  } as const

  type SizeTypes = keyof typeof SIZE_CLASSES

  const PADDING_CLASSES = {
    text: ['px-2 py-1'],
    icon: ['p-1'],
    none: ['p-0']
  } as const

  type PaddingTypes = keyof typeof PADDING_CLASSES

  type DropdownMenuGroup = {
    type: 'group'
    label?: string | undefined
    items: DropdownMenuItemTypes[]
  }

  type DropdownMenuItem = {
    type: 'item'
    label: string
    value: string
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
  }

  type DropdownMenuCheckboxItem = {
    type: 'checkboxitem'
    label: string
    value: string
    disabled?: boolean | undefined
    checked?: boolean | undefined
    onchange: (checked: boolean) => void
  }

  type DropdownMenuRadioGroup = {
    type: 'radiogroup'
    label?: string
    items: DropdownMenuRadioItem[]
    value?: string | undefined
    onchange: (value: string) => void
  }

  type DropdownMenuRadioItem = {
    type: 'radioitem'
    label: string
    value: string
    disabled?: boolean | undefined
  }

  type DropdownMenuSubmenu = {
    type: 'submenu'
    label: string
    items: DropdownMenuGroupTypes[]
    icon: string
  }

  type DropdownMenuItemSubmenu = {
    type: 'itemsubmenu'
    label: string
    value: string
    items: DropdownMenuGroupTypes[]
    icon: string
    disabled?: boolean | undefined
    onselect: () => void | Promise<void>
  }

  type DropdownMenuItemTypes = DropdownMenuItem | DropdownMenuCheckboxItem | DropdownMenuSubmenu | DropdownMenuItemSubmenu

  type DropdownMenuGroupTypes = DropdownMenuGroup | DropdownMenuRadioGroup

  type DropdownMenuProps = Omit<DropdownMenu.RootProps, 'class'> & {
    groups: DropdownMenuGroupTypes[]
    rounded?: RoundedTypes | undefined
    size?: SizeTypes | undefined
    padding?: PaddingTypes | undefined
    contentProps?: Omit<WithoutChild<DropdownMenu.ContentProps>, 'class'>
  }

  let { open = $bindable(false), groups, children, rounded = 'regular', size = 'regular', padding = 'text', contentProps, ...restProps }: DropdownMenuProps = $props()
</script>

<DropdownMenu.Root bind:open {...restProps}>
  <DropdownMenu.Trigger
    class={[
      'flex items-center justify-center rounded-md transition-opacity duration-200',
      'focus-visible:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      't-dark:not-disabled:hover:bg-zinc-800 t-dark:focus-visible:outline-zinc-750',
      't-light:not-disabled:hover:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
      't-rust:not-disabled:hover:bg-rust-800 t-rust:focus-visible:outline-rust-750',
      't-midnight:not-disabled:hover:bg-gray-800 t-midnight:focus-visible:outline-gray-750',
      ...ROUNDED_CLASSES[rounded],
      ...SIZE_CLASSES[size],
      ...PADDING_CLASSES[padding]
    ]}
  >
    {@render children?.()}
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal to="#portal">
    <DropdownMenu.Content class="min-w-48 outline-none z-50" sideOffset={4} {...contentProps} forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer padding={2}>
                  {@render DRenderGroups(groups)}
                </StaticContainer>
              </StyledContainer>

              <DropdownMenu.Arrow class={['transition-[color] duration-200', 't-dark:text-zinc-750', 't-light:text-zinc-300', 't-rust:text-rust-750', 't-midnight:text-gray-750']} />
            </div>
          </div>
        {/if}
      {/snippet}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>

{#snippet DGroup({ label, items }: DropdownMenuGroup)}
  <DropdownMenu.Group>
    {#if label}
      <DropdownMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']}>{label}</DropdownMenu.GroupHeading>
    {/if}

    {@render DRenderItems(items)}
  </DropdownMenu.Group>
{/snippet}

{#snippet DItem({ label, value, icon, disabled, onselect }: DropdownMenuItem)}
  <DropdownMenu.Item
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
  </DropdownMenu.Item>
{/snippet}

{#snippet DCheckboxItem({ label, value, disabled, checked, onchange }: DropdownMenuCheckboxItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity duration-200">
    <DropdownMenu.CheckboxItem
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
    </DropdownMenu.CheckboxItem>
    <Label {disabled}>{label}</Label>
  </div>
{/snippet}

{#snippet DRadioItem({ label, value, disabled }: DropdownMenuRadioItem)}
  <div class="w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-opacity duration-200">
    <DropdownMenu.RadioItem
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
    </DropdownMenu.RadioItem>
    <Label {disabled}>{label}</Label>
  </div>
{/snippet}

{#snippet DRadioGroup({ label, value, items, onchange }: DropdownMenuRadioGroup)}
  <DropdownMenu.RadioGroup {value} onValueChange={onchange}>
    {#if label}
      <DropdownMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']}>{label}</DropdownMenu.GroupHeading>
    {/if}

    {#each items as item}
      {@render DRadioItem(item)}
    {/each}
  </DropdownMenu.RadioGroup>
{/snippet}

{#snippet DSubmenu({ label, icon, items }: DropdownMenuSubmenu)}
  <DropdownMenu.Sub>
    <DropdownMenu.SubTrigger
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
      <Icon icon="ph:caret-right" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </DropdownMenu.SubTrigger>

    <DropdownMenu.SubContent sideOffset={12} class="min-w-48 outline-none z-50" forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer padding={2}>
                  {@render DRenderGroups(items)}
                </StaticContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
    </DropdownMenu.SubContent>
  </DropdownMenu.Sub>
{/snippet}

{#snippet DItemSubmenu({ label, icon, value, items, disabled, onselect }: DropdownMenuItemSubmenu)}
  <DropdownMenu.Sub>
    <DropdownMenu.SubTrigger
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
      <Icon icon="ph:caret-right" class="pl-4 ml-auto flex items-center justify-center opacity-40" />
    </DropdownMenu.SubTrigger>

    <DropdownMenu.SubContent sideOffset={12} class="min-w-48 outline-none z-50" forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer padding={2}>
                  {@render DRenderGroups(items)}
                </StaticContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
    </DropdownMenu.SubContent>
  </DropdownMenu.Sub>
{/snippet}

{#snippet DRenderItems(items: DropdownMenuItemTypes[])}
  {#each items as item}
    {#if item.type === 'item'}
      {@render DItem(item)}
    {:else if item.type === 'checkboxitem'}
      {@render DCheckboxItem(item)}
    {:else if item.type === 'submenu'}
      {@render DSubmenu(item)}
    {:else if item.type === 'itemsubmenu'}
      {@render DItemSubmenu(item)}
    {/if}
  {/each}
{/snippet}

{#snippet DRenderGroups(groups: DropdownMenuGroupTypes[])}
  {#each groups as group, i}
    {#if group.type === 'group'}
      {@render DGroup(group)}
    {:else if group.type === 'radiogroup'}
      {@render DRadioGroup(group)}
    {/if}

    {#if i < groups.length - 1}
      <DropdownMenu.Separator class={['w-full h-px my-2', 't-dark:bg-zinc-750', 't-light:bg-zinc-350', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} />
    {/if}
  {/each}
{/snippet}
