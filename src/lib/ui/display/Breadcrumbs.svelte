<script lang="ts">
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";

  import { rustory } from "$lib/stores/rustory.svelte";

  import { ButtonUnstyled } from "$lib/ui/form/Buttons";
  import Icon from "$lib/ui/base/Icon.svelte";
</script>

<ButtonUnstyled icon onclick={() => goto("/")}>
  <Icon icon="ph:house" />
</ButtonUnstyled>
{#each rustory.window.breadcrumbs.segments as segment (segment.href + segment.label)}
  <span
    in:fly={{ duration: 200, opacity: 0, x: -5 }}
    out:fly={{ duration: 200, opacity: 0, x: -5 }}
  >
    <Icon icon="material-symbols:chevron-right-rounded" />
  </span>

  <span
    in:fly={{ duration: 200, opacity: 0, x: -5 }}
    out:fly={{ duration: 200, opacity: 0, x: -5 }}
    class="text-[.72em]"
  >
    <ButtonUnstyled icon onclick={() => goto(segment.href)}>
      {segment.label}
    </ButtonUnstyled>
  </span>
{/each}
