<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type ButtonProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    isContainer?: boolean | undefined
  }

  let { children, isContainer = false, ...restProps }: ButtonProps = $props()
</script>

<button
  class={[
    'w-full flex flex-col text-start rounded-md overflow-hidden border shadow/20 transition-[opacity,border,background-color] duration-200',
    'focus-visible:outline-1',
    'cursor-pointer disabled:cursor-not-allowed',
    'disabled:opacity-40',
    't-dark:bg-zinc-850 t-dark:border-zinc-750 t-dark:focus-visible:outline-zinc-750',
    't-light:bg-zinc-100 t-light:border-zinc-300 t-light:focus-visible:outline-zinc-300',
    't-rust:bg-rust-850 t-rust:border-rust-750 t-rust:focus-visible:outline-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-gray-750 t-midnight:focus-visible:outline-gray-750',
    isContainer && '@container'
  ]}
  {...restProps}
>
  {@render children?.()}
</button>
