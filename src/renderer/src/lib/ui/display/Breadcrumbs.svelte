<script lang="ts">
  import { goto } from '@mateothegreat/svelte5-router'
  import { fly } from 'svelte/transition'

  import { Window } from '@renderer/lib/classes/Rustory'

  import { ButtonUnstyled } from '@renderer/lib/ui/form/Buttons'
  import Icon from '@renderer/lib/ui/base/Icon.svelte'
</script>

<ButtonUnstyled icon onclick={() => goto('/')}>
  <Icon icon="ph:house" />
</ButtonUnstyled>
{#each Window.instance.breadcrumbs.segments as segment (segment.href + segment.label)}
  <span in:fly={{ duration: 200, opacity: 0, x: -5 }} out:fly={{ duration: 200, opacity: 0, x: -5 }}>
    <Icon icon="material-symbols:chevron-right-rounded" />
  </span>

  <span in:fly={{ duration: 200, opacity: 0, x: -5 }} out:fly={{ duration: 200, opacity: 0, x: -5 }} class="text-xs">
    <ButtonUnstyled icon onclick={() => goto(segment.href)}>
      {segment.label}
    </ButtonUnstyled>
  </span>
{/each}
