<script lang="ts">
  import { Collapsible, type WithoutChild } from "bits-ui";

  import Icon from "$lib/ui/base/Icon.svelte";
  import { slide } from "svelte/transition";

  type Props = WithoutChild<Collapsible.RootProps> & {
    buttonText: string;
  };

  let {
    open = $bindable(false),
    ref = $bindable(null),
    buttonText,
    children,
    ...restProps
  }: Props = $props();
</script>

<Collapsible.Root
  bind:open
  bind:ref
  {...restProps}
  class={[
    "w-full rounded-sm shadow-sm shadow-black/50 overflow-hidden duration-200",
    "t-dark:text-zinc-100 t-dark:bg-zinc-900",
    "t-light:text-zinc-900 t-light:bg-zinc-100",
    "t-rust:text-rust-100 t-rust:bg-rust-900",
    "t-midnight:text-gray-100 t-midnight:bg-gray-900",
  ]}
>
  <Collapsible.Trigger
    class={["w-full flex items-center justify-between p-2 cursor-pointer data-[open]"]}
  >
    {buttonText}
    <Icon
      icon="ph:caret-down-bold"
      class={[
        "duration-200",
        "t-dark:text-zinc-100",
        "t-light:text-zinc-900",
        "t-rust:text-rust-100",
        "t-midnight:text-gray-100",
        open && "rotate-180",
      ]}
    />
  </Collapsible.Trigger>

  <Collapsible.Content forceMount>
    {#snippet child({ props, open })}
      {#if open}
        <div transition:slide={{ duration: 200 }} {...props}>
          <div
            class={[
              "w-full p-2 border-t-2 duration-200",
              "t-dark:text-zinc-100 t-dark:border-zinc-800",
              "t-light:text-zinc-900 t-light:border-zinc-200",
              "t-rust:text-rust-100 t-rust:border-rust-800",
              "t-midnight:text-gray-100 t-midnight:border-gray-800",
            ]}
          >
            {@render children?.()}
          </div>
        </div>
      {/if}
    {/snippet}
  </Collapsible.Content>
</Collapsible.Root>
