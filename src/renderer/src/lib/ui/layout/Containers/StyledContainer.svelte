<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type StyledContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    children: Snippet
    isContainer?: boolean | undefined
  }

  let { children, isContainer = false, ...restProps }: StyledContainerProps = $props()
</script>

<div
  class={[
    'w-full h-full rounded-md overflow-hidden border transition-[border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-zinc-750',
    't-light:bg-zinc-150 t-light:border-zinc-250',
    't-rust:bg-rust-850 t-rust:border-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-gray-750',
    isContainer && '@container'
  ]}
  {...restProps}
>
  {@render children?.()}
</div>
