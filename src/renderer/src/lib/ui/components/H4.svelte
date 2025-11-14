<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type H4Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
  }

  let { mode = 'primary', children, ...restProps }: H4Props = $props()
</script>

<h4 class={['text-xl font-bold', mode === 'secondary' && 'text-zinc-200/50']} {...restProps}>
  {@render children?.()}
</h4>
