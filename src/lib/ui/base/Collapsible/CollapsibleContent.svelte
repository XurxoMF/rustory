<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLAttributes } from "svelte/elements";
  import { slide } from "svelte/transition";

  type CollapsibleTogglerPropsType = HTMLAttributes<HTMLDivElement> & {
    children: Snippet<[]>;
    open: boolean;
  };

  let { children, open, ...restProps }: CollapsibleTogglerPropsType = $props();
</script>

<!-- The external div closes and opens with a slide animation -->
<!-- The internal div is where styles and events will be applied -->
<!-- This is to prevent the animation from breaking styles like padding or flex -->

{#if open}
  <div transition:slide={{ duration: 200 }} class="h-fit opacity-100 overflow-hidden">
    <div {...restProps}>
      {@render children()}
    </div>
  </div>
{/if}
