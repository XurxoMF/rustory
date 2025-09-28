<script lang="ts">
  import { type HTMLInputAttributes } from 'svelte/elements'

  type InputProps = Omit<HTMLInputAttributes, 'class'>

  let { ...restProps }: InputProps = $props()
</script>

<input
  class={[
    'w-full flex items-center justify-between gap-2 px-2 py-1 rounded-md focus:outline-1 read-only:cursor-default border transition-[border,background-color] duration-200',
    't-dark:bg-zinc-800 t-dark:border-zinc-750 t-dark:focus:outline-zinc-750',
    't-light:bg-zinc-200 t-light:border-zinc-250 t-light:focus:border-zinc-250',
    't-rust:bg-rust-800 t-rust:border-rust-750 t-rust:focus:border-rust-750',
    't-midnight:bg-gray-800 t-midnight:border-gray-750 t-midnight:focus:border-gray-750'
  ]}
  {...restProps}
/>
