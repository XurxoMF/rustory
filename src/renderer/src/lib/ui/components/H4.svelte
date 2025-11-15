<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export type H4Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
    align?: 'start' | 'center' | 'end' | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', children, ...restProps }: H4Props = $props()
</script>

<h4
  class={[
    'text-xl font-bold leading-tight',
    mode === 'secondary' && 'text-current/50',
    align === 'start' && 'text-left',
    align === 'center' && 'text-center',
    align === 'end' && 'text-right'
  ]}
  {...restProps}
>
  {@render children?.()}
</h4>
