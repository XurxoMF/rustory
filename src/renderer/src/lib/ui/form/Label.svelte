<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type LabelProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'class'> & {
    children: Snippet
    required?: boolean | undefined
    disabled?: boolean | undefined
  }

  let { children, required = false, disabled = false, ...restProps }: LabelProps = $props()
</script>

<h1 class={['flex items-center gap-1 flex-wrap ml-1', disabled && 'opacity-50']} {...restProps}>
  {@render children()}

  {#if required}
    <span class="text-red-500">*</span>
  {/if}
</h1>
