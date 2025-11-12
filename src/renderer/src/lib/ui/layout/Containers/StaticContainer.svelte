<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  const PADDING_CLASSES = {
    0: ['p-0'],
    1: ['p-1'],
    2: ['p-2'],
    3: ['p-3'],
    4: ['p-4'],
    5: ['p-5'],
    6: ['p-6'],
    7: ['p-7'],
    8: ['p-8']
  } as const

  type PaddingTypes = keyof typeof PADDING_CLASSES

  type StaticContainerProps = Omit<HTMLAttributes<HTMLDivElement>, 'class'> & {
    children: Snippet
    headerContent?: Snippet | undefined
    padding?: PaddingTypes | undefined
  }

  let { children, headerContent, padding = 3, ...restProps }: StaticContainerProps = $props()
</script>

<div class="w-full h-full flex flex-col">
  {#if headerContent}
    <div class="w-full flex items-center justify-between p-2">
      {@render headerContent?.()}
    </div>
  {/if}

  <div
    class={[
      'w-full h-full flex flex-col',
      headerContent && ['border-t transition-[border] duration-200', 't-dark:border-t-zinc-750', 't-light:border-t-zinc-300', 't-rust:border-t-rust-750', 't-midnight:border-t-gray-750'],
      PADDING_CLASSES[padding]
    ]}
    {...restProps}
  >
    {@render children?.()}
  </div>
</div>
