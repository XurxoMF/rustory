<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements'

  export type PProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
    align?: 'start' | 'center' | 'end' | undefined
  }
</script>

<script lang="ts">
  let { mode = 'primary', align = 'start', children, ...restProps }: PProps = $props()
</script>

<p
  class={[
    'leading-tight',
    mode === 'secondary' && 'text-current/50',
    align === 'start' && 'text-left',
    align === 'center' && 'text-center',
    align === 'end' && 'text-right'
  ]}
  {...restProps}
>
  {@render children?.()}
</p>
