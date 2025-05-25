<script lang="ts">
  import type { Snippet } from "svelte";
  import { slide } from "svelte/transition";

  type SectionProps = {
    children: Snippet<[]>;
    title?: string;
  };

  let { children, title }: SectionProps = $props();
</script>

<div
  class={[
    "w-full rounded-sm overflow-hidden border transition-[border,background-color] duration-200",
    "t-dark:bg-zinc-850 t-dark:border-zinc-750",
    "t-light:bg-zinc-150 t-light:border-zinc-250",
    "t-rust:bg-rust-850 t-rust:border-rust-750",
    "t-midnight:bg-gray-850 t-midnight:border-gray-750",
  ]}
>
  {#if title}
    <div class="w-full flex items-center justify-between p-2">
      {title}
    </div>
  {/if}

  <div
    class={[
      "w-full p-2",
      title && [
        "border-t transition-[border] duration-200",
        "t-dark:border-t-zinc-750",
        "t-light:border-t-zinc-250",
        "t-rust:border-t-rust-750",
        "t-midnight:border-t-gray-750",
      ],
    ]}
  >
    {@render children?.()}
  </div>
</div>
