<script lang="ts">
  import type { OnChangeFn } from 'bits-ui/dist/internal/types'
  import { Select, type WithoutChildren } from 'bits-ui'
  import { fade } from 'svelte/transition'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'
  import { StyledContainer, StaticContainer } from '@renderer/lib/ui/layout/Containers'

  type SelectItem = {
    value: string
    label: string
    comment?: string
    disabled?: boolean
  }

  type SelectProps = Omit<WithoutChildren<Select.RootProps>, 'class' | 'items' | 'onValueChange'> & {
    items: SelectItem[]
    placeholder: string | undefined
    onValueChange: OnChangeFn<string> | OnChangeFn<string[]>
    contentProps?: WithoutChildren<Select.ContentProps> | undefined
  }

  let { value = $bindable(), items, contentProps, placeholder, onValueChange, ...restProps }: SelectProps = $props()

  const selected = $derived(items.find((item) => item.value === value))
</script>

<Select.Root bind:value={value as never} onValueChange={onValueChange as never} {...restProps}>
  <Select.Trigger
    class={[
      'h-9 w-full flex items-center justify-between px-2 py-1 rounded-md text-start border transition-[opacity,border,background-color] duration-200',
      'focus-visible:outline-1',
      'cursor-pointer disabled:cursor-not-allowed',
      'disabled:opacity-40',
      't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
      't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
      't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
      't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750'
    ]}
  >
    <span class="w-full flex items-center justify-start gap-2">
      {#if selected}
        <p>{selected.label}</p>
        <p class="text-sm opacity-40">{selected.comment}</p>
      {:else}
        <p class="opacity-40">{placeholder}</p>
      {/if}
    </span>

    <Icon icon="ph:caret-up-down" />
  </Select.Trigger>

  <Select.Portal to="#portal">
    <Select.Content sideOffset={4} class={['w-[var(--bits-select-anchor-width)] max-h-60 outline-none z-50']} forceMount {...contentProps}>
      {#snippet child({ props, wrapperProps, open })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:fade={{ duration: 100 }}>
              <StyledContainer>
                <StaticContainer>
                  <Select.Viewport>
                    {#each items as { value, label, comment, disabled } (value)}
                      <Select.Item
                        {value}
                        {label}
                        {disabled}
                        class={[
                          'w-full flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-[background-color] duration-200',
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
                            <Icon icon="ph:check-bold" />
                          {/if}
                        {/snippet}
                      </Select.Item>
                    {/each}
                  </Select.Viewport>
                </StaticContainer>
              </StyledContainer>
            </div>
          </div>
        {/if}
      {/snippet}
    </Select.Content>
  </Select.Portal>
</Select.Root>
