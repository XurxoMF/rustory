<script lang="ts">
  import { Combobox, type WithoutChildrenOrChild, mergeProps } from 'bits-ui'
  import Icon from '../base/Icon.svelte'
  import { slide } from 'svelte/transition'

  type Props = Combobox.RootProps & {
    inputProps?: Omit<WithoutChildrenOrChild<Combobox.InputProps>, 'class'>
    contentProps?: Omit<WithoutChildrenOrChild<Combobox.ContentProps>, 'class'>
  }

  let { items, value = $bindable(), open = $bindable(false), inputProps, contentProps, type, ...restProps }: Props = $props()

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

<Combobox.Root {type} {items} bind:value={value as never} bind:open {...mergedRootProps}>
  <div class="relative w-full flex items-center justify-between rounded-md">
    <Combobox.Input
      class={[
        'w-full flex items-center justify-between gap-2 px-2 py-1 rounded-md border transition-[border,background-color] duration-200',
        'read-only:outline-none not-read-only:focus:outline-1',
        'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
        'disabled:opacity-50',
        't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
        't-light:bg-zinc-200 t-light:border-zinc-250 t-light:focus:border-zinc-250',
        't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus:border-rust-750',
        't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus:border-gray-750'
      ]}
      {...mergedInputProps}
    />

    <Combobox.Trigger
      class={[
        'absolute right-0 p-2 transition-[opacity] duration-200',
        'read-only:outline-none not-read-only:focus:outline-1',
        'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
        'disabled:opacity-50'
      ]}
    >
      <Icon icon="ph:caret-up-down" />
    </Combobox.Trigger>
  </div>

  <Combobox.Portal to="#portal">
    <Combobox.Content
      class={[
        'max-h-60 m-1 z-50 overflow-hidden flex items-center justify-between rounded-md shadow-sm shadow-black/25 border transition-[border,background-color] duration-200',
        't-dark:bg-zinc-800 t-dark:border-zinc-750',
        't-light:bg-zinc-200 t-light:border-zinc-250',
        't-rust:bg-rust-800 t-rust:border-rust-750',
        't-midnight:bg-gray-800 t-midnight:border-gray-750'
      ]}
      forceMount
      {...contentProps}
    >
      {#snippet child({ props, wrapperProps, open })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:slide={{ duration: 200 }}>
              <Combobox.Viewport>
                {#each filteredItems as { value, label, disabled } (value)}
                  <Combobox.Item
                    {value}
                    {label}
                    {disabled}
                    class={[
                      'w-[var(--bits-combobox-anchor-width)] h-[var(--bits-combobox-anchor-height)] flex items-center justify-between gap-2 px-2 py-1 cursor-pointer not-last:border-b transition-[babcground-color] duration-200',
                      't-dark:not-last:border-b-zinc-750',
                      't-light:not-last:border-b-zinc-250',
                      't-rust:not-last:border-b-rust-750',
                      't-midnight:not-last:border-b-gray-750'
                    ]}
                  >
                    {#snippet children({ selected })}
                      <p class="w-full">{label}</p>

                      {#if selected}
                        <Icon icon="ph:check-bold" />
                      {/if}
                    {/snippet}
                  </Combobox.Item>
                {:else}
                  <p
                    class={[
                      'w-[var(--bits-combobox-anchor-width)] h-[var(--bits-combobox-anchor-height)] flex items-center justify-between gap-2 px-2 py-1 cursor-pointer not-last:border-b transition-[babcground-color] duration-200',
                      't-dark:not-last:border-b-zinc-750',
                      't-light:not-last:border-b-zinc-250',
                      't-rust:not-last:border-b-rust-750',
                      't-midnight:not-last:border-b-gray-750'
                    ]}
                  >
                    No results found
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
