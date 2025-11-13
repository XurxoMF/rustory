<script lang="ts">
  import type { WithoutChildren } from 'bits-ui'
  import { type HTMLAttributes } from 'svelte/elements'

  type StaticSectionProps = HTMLAttributes<HTMLDivElement> & {
    title?: string | undefined
    headerProps?: WithoutChildren<HTMLAttributes<HTMLDivElement>> | undefined
    contentProps?: WithoutChildren<HTMLAttributes<HTMLDivElement>> | undefined
  }

  let { title, children, headerProps, contentProps, ...restProps }: StaticSectionProps = $props()
</script>

<div
  class={[
    'rounded-md border shadow/20 transition-[border,background-color] duration-200',
    't-dark:bg-zinc-850 t-dark:border-zinc-750',
    't-light:bg-zinc-100 t-light:border-zinc-300',
    't-rust:bg-rust-850 t-rust:border-rust-750',
    't-midnight:bg-gray-850 t-midnight:border-gray-750'
  ]}
  {...restProps}
>
  {#if title}
    <div class="w-full flex items-center justify-between gap-2 p-2" {...headerProps}>
      <h1>{title}</h1>
    </div>
  {/if}

  <div
    class={['p-2', title && ['border-t transition-[border] duration-200', 't-dark:border-t-zinc-750', 't-light:border-t-zinc-300', 't-rust:border-t-rust-750', 't-midnight:border-t-gray-750']]}
    {...contentProps}
  >
    {@render children?.()}
  </div>
</div>
