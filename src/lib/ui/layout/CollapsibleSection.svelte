<script lang="ts">
  import { type Snippet } from "svelte";

  import {
    CollapsibleRoot,
    CollapsibleContent,
    CollapsibleToggler,
  } from "$lib/ui/base/Collapsible";
  import Icon from "$lib/ui/base/Icon.svelte";

  type CollapsibleSectionProps = {
    title: Snippet<[]>;
    content: Snippet<[]>;
  };

  let { title, content }: CollapsibleSectionProps = $props();
</script>

<CollapsibleRoot
  class={[
    "w-full rounded-sm shadow-sm shadow-black/50 overflow-hidden duration-200",
    "t-dark:text-zinc-100 t-dark:bg-zinc-900",
    "t-light:text-zinc-900 t-light:bg-zinc-100",
    "t-rust:text-rust-100 t-rust:bg-rust-900",
    "t-midnight:text-gray-100 t-midnight:bg-gray-900",
  ]}
>
  {#snippet collapsible(collapsible)}
    <CollapsibleToggler
      toggle={collapsible.toggle}
      class={["w-full flex items-center justify-between p-2 cursor-pointer"]}
    >
      {@render title()}
      <Icon
        icon="ph:caret-down-bold"
        class={[
          "duration-200",
          "t-dark:text-zinc-100",
          "t-light:text-zinc-900",
          "t-rust:text-rust-100",
          "t-midnight:text-gray-100",
          collapsible.open && "rotate-180",
        ]}
      />
    </CollapsibleToggler>

    <CollapsibleContent
      open={collapsible.open}
      class={[
        "w-full p-2 border-t-2 duration-200",
        "t-dark:text-zinc-100 t-dark:border-zinc-800",
        "t-light:text-zinc-900 t-light:border-zinc-200",
        "t-rust:text-rust-100 t-rust:border-rust-800",
        "t-midnight:text-gray-100 t-midnight:border-gray-800",
      ]}
    >
      {@render content()}
    </CollapsibleContent>
  {/snippet}
</CollapsibleRoot>
