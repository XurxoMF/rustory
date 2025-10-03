<script lang="ts">
  import { DropdownMenu, type WithoutChild } from 'bits-ui'
  import { fade } from 'svelte/transition'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { StyledContainer, StaticContainer } from '@renderer/lib/ui/layout/Containers'

  type Props = Omit<DropdownMenu.RootProps, 'class'> & {
    items: { label: string; value: string; onselect: () => void | Promise<void>; icon: string; disabled?: boolean | undefined }[]
    contentProps?: Omit<WithoutChild<DropdownMenu.ContentProps>, 'class'>
  }

  let { open = $bindable(false), items, contentProps, ...restProps }: Props = $props()
</script>

<DropdownMenu.Root bind:open {...restProps}>
  <DropdownMenu.Trigger
    class={[
      'h-9 w-9 flex items-center justify-center rounded-md p-1 transition-[opacity] duration-200',
      'focus-visible:outline-2',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-50',
      't-dark:focus-visible:outline-zinc-750',
      't-light:focus-visible:outline-zinc-300',
      't-rust:focus-visible:outline-rust-750',
      't-midnight:focus-visible:outline-gray-750'
    ]}
  >
    <Icon icon="ph:dots-three-bold" class="text-xl" />
  </DropdownMenu.Trigger>

  <DropdownMenu.Portal to="#portal">
    <DropdownMenu.Content class="min-w-48" sideOffset={4} {...contentProps} forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer>
                  <DropdownMenu.Group>
                    {#each items as { label, value, onselect, disabled, icon }}
                      <DropdownMenu.Item
                        class={[
                          'w-full flex items-center justify-start gap-2 px-2 py-1 rounded-md transition-[opacity,background-color] duration-200',
                          'outline-none',
                          'cursor-pointer disabled:cursor-not-allowed',
                          'disabled:opacity-50',
                          't-dark:focus-visible:bg-zinc-800',
                          't-light:focus-visible:bg-zinc-200',
                          't-rust:focus-visible:bg-rust-800',
                          't-midnight:focus-visible:bg-gray-800'
                        ]}
                        onSelect={onselect}
                        {disabled}
                        textValue={value}
                      >
                        <Icon {icon} />
                        <span>{label}</span>
                      </DropdownMenu.Item>
                    {/each}
                  </DropdownMenu.Group>
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
