<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type ButtonProps = Omit<HTMLButtonAttributes, 'class'> & {
    children: Snippet
    mode?: 'text' | 'icon' | 'wrapper' | 'container' | undefined
  }

  let { children, mode = 'text', ...restProps }: ButtonProps = $props()
</script>

<button
  class={[
    'flex items-center justify-center enabled:cursor-pointer disabled:opacity-50 transition-[opacity] duration-200 ',
    mode === 'container' ? 'w-full p-0 text-start' : 'w-fit',
    mode === 'text' && 'px-2 py-1',
    mode === 'icon' && 'p-1',
    mode === 'wrapper' && 'p-0 text-start'
  ]}
  {...restProps}
>
  {@render children()}
</button>
