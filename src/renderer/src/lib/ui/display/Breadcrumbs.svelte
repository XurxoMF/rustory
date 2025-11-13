<script lang="ts">
  import { goto } from '@mateothegreat/svelte5-router'
  import { fly } from 'svelte/transition'

  import { Breadcrumbs } from '@renderer/lib/classes/Breadcrumbs.svelte'

  import Button from '@renderer/lib/ui/components/Button.svelte'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
</script>

<Button onclick={() => goto('/')}>
  <Icon icon="ph:house" class="opacity-40" />
</Button>

<!-- TODO: Change animations to use tw-animate-css -->

{#each Breadcrumbs.instance.segments as segment (segment.href + segment.label)}
  <span transition:fly={{ duration: 200, opacity: 0, x: -5 }}>
    <Icon icon="ph:caret-right" class="opacity-40" />
  </span>

  <span transition:fly={{ duration: 200, opacity: 0, x: -5 }} class="text-xs">
    <Button onclick={() => goto(segment.href)}>
      <span class="opacity-40">{segment.label}</span>
    </Button>
  </span>
{/each}
