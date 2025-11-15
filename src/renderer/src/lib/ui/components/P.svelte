<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type PProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
    align?: 'start' | 'center' | 'end' | undefined
  }

  let { mode = 'primary', align = 'start', children, ...restProps }: PProps = $props()
</script>

<p
  class={[
    'leading-tight',
    mode === 'secondary' && 'text-zinc-200/50',
    align === 'start' && 'text-left',
    align === 'center' && 'text-center',
    align === 'end' && 'text-right'
  ]}
  {...restProps}
>
  {@render children?.()}
</p>
