<script lang="ts">
  import { goto } from "$app/navigation";
  import { fly } from "svelte/transition";

  import { rustory } from "$lib/stores/rustory";

  import { ButtonTransparent } from "$lib/ui/form/Button";
  import Icon from "$lib/ui/base/Icon.svelte";
</script>

<ButtonTransparent onclick={() => goto("/")}>
  <Icon icon="ph:house" />
</ButtonTransparent>
{#each rustory.mainWindow.breadcrumbs.segments as segment (segment.href + segment.label)}
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
    <ButtonTransparent onclick={() => goto(segment.href)}>
      {segment.label}
    </ButtonTransparent>
  </span>
{/each}
