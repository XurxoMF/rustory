<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type H3Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
    align?: 'start' | 'center' | 'end' | undefined
  }

  let { mode = 'primary', align = 'start', children, ...restProps }: H3Props = $props()
</script>

<h3
  class={[
    'text-2xl font-bold leading-tight',
    mode === 'secondary' && 'text-zinc-200/50',
    align === 'start' && 'text-left',
    align === 'center' && 'text-center',
    align === 'end' && 'text-right'
  ]}
  {...restProps}
>
  {@render children?.()}
</h3>
