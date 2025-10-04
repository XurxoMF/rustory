<script lang="ts">
  import type { OnChangeFn } from 'bits-ui/dist/internal/types'
  import { Combobox, type WithoutChildrenOrChild, mergeProps } from 'bits-ui'
  import { slide } from 'svelte/transition'

  import { m } from '@renderer/paraglide/messages'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

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
        'read-only:outline-none not-read-only:focus-visible:outline-1',
        'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
        'disabled:opacity-50',
        't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
        't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
        't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
        't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750'
      ]}
      {...mergedInputProps}
    />

    <Combobox.Trigger
      class={[
        'absolute right-0 p-2 transition-[opacity] duration-200',
        'read-only:outline-none not-read-only:focus-visible:outline-1',
        'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
        'disabled:opacity-50'
      ]}
    >
      <Icon icon="ph:caret-up-down" />
    </Combobox.Trigger>
  </div>

  <Combobox.Portal to="#portal">
    <Combobox.Content
      sideOffset={4}
      class={[
        'w-[var(--bits-combobox-anchor-width)] max-h-60 z-50 overflow-hidden rounded-md shadow-sm shadow-black/25 p-1 gap-1 border transition-[border,background-color] duration-200',
        't-dark:bg-zinc-850 t-dark:border-zinc-750',
        't-light:bg-zinc-100 t-light:border-zinc-300',
        't-rust:bg-rust-850 t-rust:border-rust-750',
        't-midnight:bg-gray-850 t-midnight:border-gray-750'
      ]}
      forceMount
      {...contentProps}
    >
      {#snippet child({ props, wrapperProps, open })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:slide={{ duration: 200 }}>
              <Combobox.Viewport class="w-full">
                {#each filteredItems as { value, label, comment, disabled } (value)}
                  <Combobox.Item
                    {value}
                    {label}
                    {disabled}
                    class={[
                      'w-full h-fit flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-[background-color] duration-200',
                      't-dark:data-highlighted:bg-zinc-800',
                      't-light:data-highlighted:bg-zinc-200',
                      't-rust:data-highlighted:bg-rust-800',
                      't-midnight:data-highlighted:bg-gray-800'
                    ]}
                  >
                    {#snippet children({ selected })}
                      <span class="w-full flex items-center justify-start gap-2">
                        <p>{label}</p>
                        <p class="text-sm opacity-50">{comment}</p>
                      </span>

                      {#if selected}
                        <Icon icon="ph:check-bold" />
                      {/if}
                    {/snippet}
                  </Combobox.Item>
                {:else}
                  <p class={['w-full flex items-center justify-center px-2 py-2 text-sm opacity-50 cursor-pointer duration-200']}>
                    {`${m.common__no_results_found()}...`}
                  </p>
                {/each}
              </Combobox.Viewport>
            </div>
          </div>
        {/if}
      {/snippet}
    </Combobox.Content>
  </Combobox.Portal>
</Combobox.Root>
