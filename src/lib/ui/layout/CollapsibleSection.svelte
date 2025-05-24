<script lang="ts">
  import { Collapsible, type WithoutChild } from "bits-ui";

  import Icon from "$lib/ui/base/Icon.svelte";
  import { slide } from "svelte/transition";

  type CollapsibleSectionProps = Pick<
    WithoutChild<Collapsible.RootProps>,
    "open" | "ref" | "children"
  > & {
    buttonText: string;
    variant?: "base" | "special";
  };

  let {
    open = $bindable(false),
    ref = $bindable(null),
    buttonText,
    variant = "special",
    children,
  }: CollapsibleSectionProps = $props();
</script>

<Collapsible.Root
  bind:open
  bind:ref
  class={[
    "w-full rounded-sm shadow-sm shadow-black/50 overflow-hidden transition-[background-color] duration-200",
    variant === "base"
      ? [
          "t-dark:bg-zinc-800",
          "t-light:bg-zinc-300",
          "t-rust:bg-rust-800",
          "t-midnight:bg-gray-800",
        ]
      : [
          "t-dark:bg-zinc-900",
          "t-light:bg-zinc-100",
          "t-rust:bg-rust-900",
          "t-midnight:bg-gray-900",
        ],
  ]}
>
  <Collapsible.Trigger
    class={["w-full flex items-center justify-between p-2 cursor-pointer data-[open]"]}
  >
    {buttonText}
    <Icon
      icon="ph:caret-down-bold"
      class={["transition-transform duration-200", open && "rotate-180"]}
    />
  </Collapsible.Trigger>

  <Collapsible.Content forceMount>
    {#snippet child({ props, open })}
      {#if open}
        <div transition:slide={{ duration: 200 }} {...props}>
          <div
            class={[
              "w-full p-2 border-t-2 transition-[border] duration-200",

              variant === "base"
                ? [
                    "t-dark:border-zinc-900",
                    "t-light:border-zinc-100",
                    "t-rust:border-rust-900",
                    "t-midnight:border-gray-900",
                  ]
                : [
                    "t-dark:border-zinc-800",
                    "t-light:border-zinc-300",
                    "t-rust:border-rust-800",
                    "t-midnight:border-gray-800",
                  ],
            ]}
          >
            {@render children?.()}
          </div>
        </div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>
