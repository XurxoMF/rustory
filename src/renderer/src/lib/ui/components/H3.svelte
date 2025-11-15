<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export type H3Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
    align?: 'start' | 'center' | 'end' | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', children, ...restProps }: H3Props = $props()
</script>

<h3
  class={[
    'text-2xl font-bold leading-tight',
    mode === 'secondary' && 'text-current/50',
    align === 'start' && 'text-left',
    align === 'center' && 'text-center',
    align === 'end' && 'text-right'
  ]}
  {...restProps}
>
  {@render children?.()}
</h3>
