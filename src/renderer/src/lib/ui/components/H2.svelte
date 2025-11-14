<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type H2Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
  }

  let { mode = 'primary', children, ...restProps }: H2Props = $props()
</script>

<h2 class={['text-3xl font-bold', mode === 'secondary' && 'text-zinc-200/50']} {...restProps}>
  {@render children?.()}
</h2>
