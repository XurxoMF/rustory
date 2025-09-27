<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type LabelProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    children: Snippet<[]>
  }

  let { children, ...restProps }: LabelProps = $props()
</script>

<h1 class="flex items-center gap-1 flex-wrap" {...restProps}>{@render children()}</h1>
