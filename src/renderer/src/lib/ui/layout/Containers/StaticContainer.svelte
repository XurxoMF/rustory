<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type StaticContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    children: Snippet
    headerContent?: Snippet | undefined
  }

  let { children, headerContent, ...restProps }: StaticContainerProps = $props()
</script>

<div class="w-full flex flex-col">
  {#if headerContent}
    <div class="w-full flex items-center justify-between p-2">
      {@render headerContent?.()}
    </div>
  {/if}

  <div
    class={[
      'w-full p-2',
      headerContent && ['border-t transition-[border] duration-200', 't-dark:border-t-zinc-750', 't-light:border-t-zinc-250', 't-rust:border-t-rust-750', 't-midnight:border-t-gray-750']
    ]}
    {...restProps}
  >
    {@render children?.()}
  </div>
</div>
