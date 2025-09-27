<script lang="ts">
  import { Select, type WithoutChildren } from 'bits-ui'
  import { slide } from 'svelte/transition'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  export type SelectItem = { value: string; label: string; comment?: string | undefined; disabled?: boolean | undefined }

  type SelectProps = WithoutChildren<Select.RootProps> & {
    placeholder?: string | undefined
    items: SelectItem[]
    contentProps?: WithoutChildren<Select.ContentProps> | undefined
  }

  let { value = $bindable(), items, contentProps, placeholder, ...restProps }: SelectProps = $props()

  const selectedLabel = $derived(items.find((item) => item.value === value)?.label)
</script>

<Select.Root bind:value={value as never} {...restProps}>
  <Select.Trigger
    class={[
      'w-full flex items-center justify-between gap-2 px-2 py-1 rounded-md cursor-pointer border transition-[border,background-color] duration-200',
      't-dark:bg-zinc-800 t-dark:border-zinc-750',
      't-light:bg-zinc-200 t-light:border-zinc-250',
      't-rust:bg-rust-800 t-rust:border-rust-750',
      't-midnight:bg-gray-800 t-midnight:border-gray-750'
    ]}
  >
    {selectedLabel ? selectedLabel : placeholder}
    <Icon icon="ph:caret-up-down" />
  </Select.Trigger>

  <Select.Portal to="#portal">
    <Select.Content
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
              <Select.Viewport>
                {#each items as { value, label, comment, disabled } (value)}
                  <Select.Item
                    {value}
                    {label}
                    {disabled}
                    class={[
                      'w-[var(--bits-select-anchor-width)] h-[var(--bits-select-anchor-height)] flex items-center justify-between gap-2 px-2 py-1 cursor-pointer not-last:border-b transition-[babcground-color] duration-200',
                      't-dark:not-last:border-b-zinc-750',
                      't-light:not-last:border-b-zinc-250',
                      't-rust:not-last:border-b-rust-750',
                      't-midnight:not-last:border-b-gray-750'
                    ]}
                  >
                    {#snippet children({ selected })}
                      <div class="flex items-center justify-start gap-2">
                        {label}
                        <span class="text-xs opacity-50">{comment}</span>
                      </div>

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
