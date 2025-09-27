<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type StaticContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    children: Snippet<[]>
    title?: string | undefined
    titleWrapperProps?: Omit<HTMLAttributes<HTMLDivElement>, 'class'>
    titleProps?: HTMLAttributes<HTMLHeadingElement>
  }

  let { children, title, titleWrapperProps, titleProps, ...restProps }: StaticContainerProps = $props()
</script>

{#if title}
  <div class="w-full flex items-center justify-between p-2" {...titleWrapperProps}>
    <h1 {...titleProps}>{title}</h1>
  </div>
{/if}

<div
  class={['w-full p-2', title && ['border-t transition-[border] duration-200', 't-dark:border-t-zinc-750', 't-light:border-t-zinc-250', 't-rust:border-t-rust-750', 't-midnight:border-t-gray-750']]}
  {...restProps}
>
  {@render children?.()}
</div>
