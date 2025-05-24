<script lang="ts">
  import { type Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import { ScrollArea } from "bits-ui";

  type PageWrapperPropsType = { children: Snippet<[]>; scrollable?: boolean };

  let { children, scrollable = true }: PageWrapperPropsType = $props();

  const ANIMATION_DURATION: number = 100;
</script>

<div
  class="w-full h-full"
  in:fade={{ duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1.5 }}
  out:fade={{ duration: ANIMATION_DURATION }}
>
  {#if scrollable}
    <ScrollArea.Root type="always" class="w-full h-full overflow-hidden">
      <ScrollArea.Viewport class="w-full h-full p-2">
        {@render children()}
      </ScrollArea.Viewport>

      <ScrollArea.Scrollbar
        orientation="vertical"
        class="w-1.5 flex p-px transition-[width] duration-200"
      >
        <ScrollArea.Thumb
          class={[
            "flex-1 rounded-full transition-[background] duration-200",
            "t-dark:bg-zinc-800",
            "t-light:bg-zinc-300",
            "t-rust:bg-rust-800",
            "t-midnight:bg-gray-800",
          ]}
        />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  {:else}
    <div class="w-full h-full p-2">
      {@render children()}
    </div>
  {/if}
</div>
