<script lang="ts">
  import { ContextMenu, type WithoutChild } from 'bits-ui'
  import { fade } from 'svelte/transition'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { StyledContainer, StaticContainer } from '@renderer/lib/ui/layout/Containers'

  type ContextMenuItem = {
    label: string
    value: string
    onselect: () => void | Promise<void>
    icon: string
    disabled?: boolean | undefined
  }

  type ContextMenuGroup = {
    label?: string | undefined
    items: ContextMenuItem[]
  }

  type ContextMenuProps = ContextMenu.RootProps & {
    groups: ContextMenuGroup[]
    contentProps?: WithoutChild<ContextMenu.ContentProps>
  }

  let { open = $bindable(false), children, groups, contentProps, ...restProps }: ContextMenuProps = $props()
</script>

<ContextMenu.Root bind:open {...restProps}>
  <ContextMenu.Trigger
    class={[
      'h-full w-full flex items-center justify-center rounded-md transition-[opacity] duration-200',
      'focus-visible:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      't-dark:focus-visible:outline-zinc-750',
      't-light:focus-visible:outline-zinc-300',
      't-rust:focus-visible:outline-rust-750',
      't-midnight:focus-visible:outline-gray-750'
    ]}
  >
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
                  <ContextMenu.Group>
                    {#each groups as { items, label }, i (label)}
                      {#if label}
                        <ContextMenu.GroupHeading class={['w-full px-2 py-1 text-sm opacity-40']}>{label}</ContextMenu.GroupHeading>
                      {/if}

                      {#each items as { label, value, onselect, disabled, icon } (value)}
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
                          <Icon {icon} />
                          <span>{label}</span>
                        </ContextMenu.Item>
                      {/each}

                      {#if i < groups.length - 1}
                        <ContextMenu.Separator class={['w-full h-px my-2', 't-dark:bg-zinc-750', 't-light:bg-zinc-350', 't-rust:bg-rust-750', 't-midnight:bg-gray-750']} />
                      {/if}
                    {/each}
                  </ContextMenu.Group>
                </StaticContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
    </ContextMenu.Content>
  </ContextMenu.Portal>
</ContextMenu.Root>
