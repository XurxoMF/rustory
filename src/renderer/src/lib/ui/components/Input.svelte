<script lang="ts">
  import type { WithoutChildren } from 'bits-ui'
  import { type HTMLInputAttributes } from 'svelte/elements'

  type InputTypes = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url'

  type InputProps = Omit<WithoutChildren<HTMLInputAttributes>, 'class' | 'type'> & {
    type: InputTypes
  }

  let { value = $bindable(), readonly, tabindex, ...restProps }: InputProps = $props()
</script>

<input
  bind:value
  {readonly}
  tabindex={readonly ? -1 : tabindex}
  class={[
    'h-9 w-full flex items-center justify-between gap-2 px-2 py-1 rounded-md shadow/20 transition-[opacity,background-color] duration-200',
    'focus-visible:outline-2 read-only:outline-none',
    'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
    'disabled:opacity-40',
    't-dark:bg-zinc-800 t-dark:focus-visible:outline-zinc-750',
    't-light:bg-zinc-200 t-light:focus-visible:outline-zinc-300',
    't-rust:bg-rust-800 t-rust:focus-visible:outline-rust-750',
    't-midnight:bg-gray-800 t-midnight:focus-visible:outline-gray-750'
  ]}
  {...restProps}
/>
