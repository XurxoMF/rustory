<script lang="ts">
  import type { OnChangeFn } from 'bits-ui/dist/internal/types'
  import { Combobox, type WithoutChildrenOrChild, mergeProps } from 'bits-ui'
  import { fade } from 'svelte/transition'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { StyledContainer, StaticContainer } from '@renderer/lib/ui/layout/Containers'

  type ComboBoxItem = {
    value: string
    label: string
    comment?: string
    disabled?: boolean
  }

  type ComboBoxProps = Omit<Combobox.RootProps, 'class' | 'items' | 'onValueChange'> & {
    items: ComboBoxItem[]
    inputProps?: Omit<WithoutChildrenOrChild<Combobox.InputProps>, 'class'>
    onValueChange: OnChangeFn<string> | OnChangeFn<string[]>
    contentProps?: Omit<WithoutChildrenOrChild<Combobox.ContentProps>, 'class'>
  }

  let { items, value = $bindable(), open = $bindable(false), inputProps, contentProps, type, onValueChange, ...restProps }: ComboBoxProps = $props()

  let searchValue = $state('')

  const filteredItems = $derived.by(() => {
    if (searchValue === '') return items
    return items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase()))
  })

  function handleInput(e: Event & { currentTarget: HTMLInputElement }) {
    searchValue = e.currentTarget.value
  }

  function handleOpenChange(newOpen: boolean) {
    if (!newOpen) searchValue = ''
  }

  const mergedRootProps = $derived(mergeProps(restProps, { onOpenChange: handleOpenChange }))
  const mergedInputProps = $derived(mergeProps(inputProps, { oninput: handleInput }))
</script>

<Combobox.Root {type} {items} bind:value={value as never} onValueChange={onValueChange as never} bind:open {...mergedRootProps}>
  <div class="relative w-full flex items-center justify-between rounded-md">
    <Combobox.Input
      class={[
        'h-9 w-full flex items-center justify-between gap-2 px-2 py-1 rounded-md border transition-[opacity,border,background-color] duration-200',
        'focus-visible:outline-1',
        'cursor-pointer disabled:cursor-not-allowed',
        'disabled:opacity-40',
        't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
        't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
        't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
        't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750'
      ]}
      {...mergedInputProps}
    />

    <Combobox.Trigger class={['absolute right-0 p-2 transition-[opacity] duration-200', 'focus-visible:outline-1', 'cursor-pointer disabled:cursor-not-allowed', 'disabled:opacity-40']} tabindex={-1}>
      <Icon icon="ph:caret-up-down" />
    </Combobox.Trigger>
  </div>

  <Combobox.Portal to="#portal">
    <Combobox.Content sideOffset={4} class={['w-[var(--bits-combobox-anchor-width)] max-h-60 z-50']} forceMount {...contentProps}>
      {#snippet child({ props, wrapperProps, open })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer>
                  <Combobox.Viewport>
                    {#each filteredItems as { value, label, comment, disabled } (value)}
                      <Combobox.Item
                        {value}
                        {label}
                        {disabled}
                        class={[
                          'w-full h-fit flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-[opacity,background-color] duration-200',
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
                      </Combobox.Item>
                    {:else}
                      <p class={['w-full flex items-center justify-center px-2 py-2 text-sm opacity-40 cursor-pointer duration-200']}>
                        {`${m.common__no_results_found()}...`}
                      </p>
                    {/each}
                  </Combobox.Viewport>
                </StaticContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
    </Combobox.Content>
  </Combobox.Portal>
</Combobox.Root>
