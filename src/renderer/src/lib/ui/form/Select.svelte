<script lang="ts">
  import { Select, type WithoutChildren } from 'bits-ui'
  import { slide } from 'svelte/transition'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type SelectProps = WithoutChildren<Select.RootProps> & {
    placeholder: string | undefined
    contentProps?: WithoutChildren<Select.ContentProps> | undefined
  }

  let { value = $bindable(), items, contentProps, placeholder, ...restProps }: SelectProps = $props()

  const selected = $derived(items.find((item) => item.value === value))
</script>

<Select.Root bind:value={value as never} {...restProps}>
  <Select.Trigger
    class={[
      'h-9 w-full flex items-center justify-between rounded-md text-start border transition-[opacity,border,background-color] duration-200',
      'focus-visible:outline-1',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-50',
      't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
      't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
      't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
      't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750'
    ]}
  >
    <p class={['w-full px-2 py-1', !selected && 'opacity-50']}>{selected ? selected.label : placeholder}</p>

    <Icon icon="ph:caret-up-down" class="p-2" />
  </Select.Trigger>

  <Select.Portal to="#portal">
    <Select.Content
      sideOffset={4}
      class={[
        'w-[var(--bits-select-anchor-width)] max-h-60 z-50 overflow-hidden rounded-md shadow-sm shadow-black/25 p-1 gap-1 border transition-[border,background-color] duration-200',
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
              <Select.Viewport class="w-full">
                {#each items as { value, label, disabled } (value)}
                  <Select.Item
                    {value}
                    {label}
                    {disabled}
                    class={[
                      'w-full h-[var(--bits-select-anchor-height)] flex items-center justify-between px-2 py-1 cursor-pointer not-last:border-b transition-[border,background-color] duration-200',
                      't-dark:not-last:border-b-zinc-750 t-dark:data-highlighted:bg-zinc-800',
                      't-light:not-last:border-b-zinc-300 t-light:data-highlighted:bg-zinc-200',
                      't-rust:not-last:border-b-rust-750 t-rust:data-highlighted:bg-rust-800',
                      't-midnight:not-last:border-b-gray-750 t-midnight:data-highlighted:bg-gray-800'
                    ]}
                  >
                    {#snippet children({ selected })}
                      <p class="w-full">{label}</p>

                      {#if selected}
                        <Icon icon="ph:check-bold" />
                      {/if}
                    {/snippet}
                  </Select.Item>
                {/each}
              </Select.Viewport>
            </div>
          </div>
        {/if}
      {/snippet}
    </Select.Content>
  </Select.Portal>
</Select.Root>
