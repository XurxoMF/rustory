<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type ButtonProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
  }

  let { children, ...restProps }: ButtonProps = $props()
</script>

<button
  class={[
    'w-full flex flex-col p-2 transition-[opacity] duration-200',
    'focus:outline-2',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    't-dark:focus:outline-zinc-750',
    't-light:focus:border-zinc-250',
    't-rust:focus:border-rust-750',
    't-midnight:focus:border-gray-750'
  ]}
  {...restProps}
>
  {@render children()}
</button>
