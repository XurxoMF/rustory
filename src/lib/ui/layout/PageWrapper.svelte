<script lang="ts">
  import { type Snippet } from "svelte";
  import { fade } from "svelte/transition";
  import { ScrollArea } from "bits-ui";

  type PageWrapperPropsType = { children: Snippet<[]>; scrollable?: boolean };

  let { children, scrollable = true }: PageWrapperPropsType = $props();

  const ANIMATION_DURATION: number = 100;
</script>

{#if scrollable}
  <ScrollArea.Root type="always" class="w-full h-full overflow-hidden">
    <ScrollArea.Viewport class="h-full w-full">
      {@render children?.()}
    </ScrollArea.Viewport>

    <ScrollArea.Scrollbar
      orientation="vertical"
      class="w-2 hover:w-3 flex border-l border-l-transparent p-px transition-[width] duration-200"
    >
      <ScrollArea.Thumb
        class={[
          "flex-1 rounded-full transition-[background] duration-200",
          "t-dark:bg-zinc-700",
          "t-light:bg-zinc-400",
          "t-rust:bg-rust-700",
          "t-midnight:bg-gray-700",
        ]}
      />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
{:else}
  <div
    class="w-full h-full"
    in:fade={{ duration: ANIMATION_DURATION, delay: ANIMATION_DURATION * 1.5 }}
    out:fade={{ duration: ANIMATION_DURATION }}
  >
    {@render children()}
  </div>
{/if}
