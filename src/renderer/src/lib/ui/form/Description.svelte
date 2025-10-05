<script lang="ts">
  import { type Snippet } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  import Tooltip from '@renderer/lib/ui/form/Tooltip.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'

  type DescriptionProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'class'> & {
    children: Snippet
    disabled?: boolean | undefined
  }

  let { children, disabled, ...restProps }: DescriptionProps = $props()
</script>

<Tooltip triggerProps={{ disabled }}>
  {#snippet trigger()}
    <Icon icon="ph:info" class="text-sm opacity-40" />
  {/snippet}

  <p class="text-sm flex items-center gap-1 flex-wrap" {...restProps}>{@render children()}</p>
</Tooltip>
