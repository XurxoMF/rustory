<script lang="ts">
  import { goto } from '@mateothegreat/svelte5-router'
  import { fly } from 'svelte/transition'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import { Button } from '@renderer/lib/ui/form/Buttons'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
</script>

Button
<Button mode="icon" onclick={() => goto('/')}>
  <Icon icon="ph:house" />
</Button>
{#each Breadcrumbs.instance.segments as segment (segment.href + segment.label)}
  <span in:fly={{ duration: 200, opacity: 0, x: -5 }} out:fly={{ duration: 200, opacity: 0, x: -5 }}>
    <Icon icon="material-symbols:chevron-right-rounded" />
  </span>

  <span in:fly={{ duration: 200, opacity: 0, x: -5 }} out:fly={{ duration: 200, opacity: 0, x: -5 }} class="text-xs">
    <Button mode="icon" onclick={() => goto(segment.href)}>
      {segment.label}
    </Button>Button
  </span>
{/each}
ButtonButton
