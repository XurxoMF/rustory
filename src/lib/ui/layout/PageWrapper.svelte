<script lang="ts">
  import { type Snippet } from "svelte";
  import { fade } from "svelte/transition";

  import ScrollableContainer from "$lib/ui/base/ScrollableContainer.svelte";

  type PageWrapperPropsType = {
    children: Snippet<[]>;
    isContainer?: boolean;
    scrollable?: boolean;
  };

  let { children, isContainer = false, scrollable = true }: PageWrapperPropsType = $props();

  const ANIMATION_DURATION: number = 100;
</script>

<div
  class="w-full h-full"
  in:fade={{ duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1.5 }}
  out:fade={{ duration: ANIMATION_DURATION }}
>
  {#if scrollable}
    <ScrollableContainer
      orientation="vertical"
      class={["w-full h-full overflow-hidden", isContainer && "@container"]}
      viewportClasses="w-full h-full p-2"
    >
      {@render children()}
    </ScrollableContainer>
  {:else}
    <div class="w-full h-full p-2">
      {@render children()}
    </div>
  {/if}
</div>
