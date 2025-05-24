<script lang="ts">
  import { Collapsible, type WithoutChild } from "bits-ui";

  import Icon from "$lib/ui/base/Icon.svelte";
  import { slide } from "svelte/transition";

  type CollapsibleSectionProps = Pick<
    WithoutChild<Collapsible.RootProps>,
    "open" | "ref" | "children"
  > & {
    buttonText: string;
  };

  let {
    open = $bindable(false),
    ref = $bindable(null),
    buttonText,
    children,
  }: CollapsibleSectionProps = $props();
</script>

<Collapsible.Root
  bind:open
  bind:ref
  class={[
    "w-full rounded-sm overflow-hidden border transition-[border] duration-200",
    "t-dark:border-zinc-800",
    "t-light:border-zinc-300",
    "t-rust:border-rust-800",
    "t-midnight:border-gray-800",
  ]}
>
  <Collapsible.Trigger class="w-full flex items-center justify-between p-2 cursor-pointer">
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
              "w-full p-2 border-t transition-[border] duration-200",
              "t-dark:border-t-zinc-800",
              "t-light:border-t-zinc-300",
              "t-rust:border-t-rust-800",
              "t-midnight:border-t-gray-800",
            ]}
          >
            {@render children?.()}
          </div>
        </div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>
