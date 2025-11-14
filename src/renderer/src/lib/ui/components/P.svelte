<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type PProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
  }

  let { mode = 'primary', children, ...restProps }: PProps = $props()
</script>

<p class={[mode === 'secondary' && 'text-zinc-200/50']} {...restProps}>
  {@render children?.()}
</p>
