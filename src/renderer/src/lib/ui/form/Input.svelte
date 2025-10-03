<script lang="ts">
  import { type HTMLInputAttributes } from 'svelte/elements'

  type InputTypes = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url'

  type InputProps = Omit<HTMLInputAttributes, 'class' | 'type'> & {
    type: InputTypes
  }

  let { ...restProps }: InputProps = $props()
</script>

<input
  class={[
    'h-9 w-full flex items-center justify-between gap-2 px-2 py-1 rounded-md border transition-[border,background-color] duration-200',
    'read-only:outline-none not-read-only:focus:outline-1',
    'cursor-pointer disabled:cursor-not-allowed read-only:cursor-default',
    'disabled:opacity-50',
    't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
    't-light:bg-zinc-200 t-light:border-zinc-250 t-light:focus:outline-zinc-250',
    't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus:outline-rust-750',
    't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus:outline-gray-750'
  ]}
  {...restProps}
/>
