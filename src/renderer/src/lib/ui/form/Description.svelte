<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  import Tooltip from '@renderer/lib/ui/form/Tooltip.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type DescriptionProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'class'> & {
    children: Snippet
  }

  let { children, ...restProps }: DescriptionProps = $props()
</script>

<Tooltip>
  {#snippet trigger()}
    <Icon icon="ph:info" class="text-sm opacity-50" />
  {/snippet}

  <p class="text-sm flex items-center gap-1 flex-wrap" {...restProps}>{@render children()}</p>
</Tooltip>
