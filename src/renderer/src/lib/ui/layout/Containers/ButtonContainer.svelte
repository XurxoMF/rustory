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
    'w-full flex flex-col text-start rounded-md transition-[opacity] duration-200',
    'focus-visible:outline-2',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-50',
    't-dark:focus-visible:outline-zinc-750',
    't-light:focus-visible:outline-zinc-300',
    't-rust:focus-visible:outline-rust-750',
    't-midnight:focus-visible:outline-gray-750'
  ]}
  {...restProps}
>
  {@render children()}
</button>
