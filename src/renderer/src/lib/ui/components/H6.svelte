<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements'

  type H6Props = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    mode?: 'primary' | 'secondary' | undefined
  }

  let { mode = 'primary', children, ...restProps }: H6Props = $props()
</script>

<h6 class={['text-base font-bold', mode === 'secondary' && 'text-zinc-200/50']} {...restProps}>
  {@render children?.()}
</h6>
