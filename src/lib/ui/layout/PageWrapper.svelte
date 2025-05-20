<script lang="ts">
  import { type Snippet } from "svelte";
  import { fade } from "svelte/transition";

  type PageWrapperPropsType = { children: Snippet<[]>; scrollable?: boolean };

  let { children, scrollable = true }: PageWrapperPropsType = $props();

  const ANIMATION_DURATION: number = 100;
</script>

<div
  class={["w-full h-full", scrollable && "overflow-y-scroll"]}
  in:fade={{ duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1.5 }}
  out:fade={{ duration: ANIMATION_DURATION }}
>
  {@render children()}
</div>
