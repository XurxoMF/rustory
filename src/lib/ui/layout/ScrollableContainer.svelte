<script lang="ts">
  import { ScrollArea, type WithoutChild } from "bits-ui";

  type Props = WithoutChild<ScrollArea.RootProps> & {
    orientation: "vertical" | "horizontal" | "both";
    viewportClasses?: string;
  };

  let {
    ref = $bindable(null),
    orientation = "vertical",
    viewportClasses,
    children,
    ...restProps
  }: Props = $props();
</script>

<ScrollArea.Root bind:ref {...restProps}>
  <ScrollArea.Viewport class={viewportClasses}>
    {@render children?.()}
  </ScrollArea.Viewport>

  {#if orientation === "vertical" || orientation === "both"}
    <ScrollArea.Scrollbar
      orientation="vertical"
      class="h-2 hover:h-3 flex border-l border-l-transparent p-px transition-[height] duration-200"
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
  {/if}
  {#if orientation === "horizontal" || orientation === "both"}
    <ScrollArea.Scrollbar
      orientation="horizontal"
      class="w-2 hover:w-3 flex border-t border-t-transparent p-px transition-[width] duration-200"
    >
      <ScrollArea.Thumb
        class={[
          "rounded-full transition-[background] duration-200",
          "t-dark:bg-zinc-700",
          "t-light:bg-zinc-400",
          "t-rust:bg-rust-700",
          "t-midnight:bg-gray-700",
        ]}
      />
    </ScrollArea.Scrollbar>
  {/if}

  {#if orientation === "both"}
    <ScrollArea.Corner />
  {/if}
</ScrollArea.Root>
