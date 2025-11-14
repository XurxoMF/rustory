<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type H1Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
  }

  let { mode = 'primary', children, ...restProps }: H1Props = $props()
</script>

<h1 class={['text-4xl font-bold', mode === 'secondary' && 'text-zinc-200/50']} {...restProps}>
  {@render children?.()}
</h1>
