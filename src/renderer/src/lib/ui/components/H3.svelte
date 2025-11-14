<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type H3Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
  }

  let { mode = 'primary', children, ...restProps }: H3Props = $props()
</script>

<h3 class={['text-2xl font-bold', mode === 'secondary' && 'text-zinc-200/50']} {...restProps}>
  {@render children?.()}
</h3>
