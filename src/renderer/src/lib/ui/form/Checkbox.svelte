<script lang="ts">
  import { Checkbox, type WithoutChildrenOrChild } from 'bits-ui'

  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type CheckboxProps = Omit<WithoutChildrenOrChild<Checkbox.RootProps>, 'class'>

  let { checked = $bindable(false), ...restProps }: CheckboxProps = $props()
</script>

<Checkbox.Root
  class={[
    'w-6 h-6 flex items-center justify-center rounded-md p-0.5 border transition-[opacity,border,background-color] duration-200',
    'focus-visible:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
    't-light:bg-zinc-200 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
    't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
    't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750'
  ]}
  bind:checked
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    {#if indeterminate}
      <Icon icon="ph:dots-three" />
    {:else if checked}
      <Icon icon="ph:check" />
    {:else}
      <Icon icon="ph:x" />
    {/if}
  {/snippet}
</Checkbox.Root>
