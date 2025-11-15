<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export type H1Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
    align?: 'start' | 'center' | 'end' | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', children, ...restProps }: H1Props = $props()
</script>

<h1
  class={[
    'text-4xl font-bold leading-tight',
    mode === 'secondary' && 'text-zinc-200/50',
    align === 'start' && 'text-left',
    align === 'center' && 'text-center',
    align === 'end' && 'text-right'
  ]}
  {...restProps}
>
  {@render children?.()}
</h1>
