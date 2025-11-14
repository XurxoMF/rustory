<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type H5Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
  }

  let { mode = 'primary', children, ...restProps }: H5Props = $props()
</script>

<h5 class={['text-lg font-bold', mode === 'secondary' && 'text-zinc-200/50']} {...restProps}>
  {@render children?.()}
</h5>
