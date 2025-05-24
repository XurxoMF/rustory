<script lang="ts">
  import { Select } from "bits-ui";
  import { slide } from "svelte/transition";

  import Icon from "$lib/ui/base/Icon.svelte";

  export type SelectItemType = { value: string; label: string; disabled?: boolean };

  type SelectProps = {
    value?: string | undefined;
    onValueChange?: (value: string | undefined) => void;
    placeholder: string;
    items: SelectItemType[];
    variant?: "base" | "special";
  };

  let {
    value = $bindable(),
    onValueChange,
    items,
    placeholder,
    variant = "base",
  }: SelectProps = $props();

  let isOpen = $state(false);

  const selectedLabel = $derived(items.find((item) => item.value === value)?.label);
</script>

<Select.Root
  type="single"
  bind:open={isOpen}
  bind:value
  onValueChange={(e) => {
    value = e;
    onValueChange?.(e);
  }}
>
  <Select.Trigger
    class={[
      "w-full flex items-center justify-between gap-2 px-2 py-1 rounded-sm shadow-sm shadow-black/50 transition-[background-color] duration-200",
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
    {selectedLabel ? selectedLabel : placeholder}
    <Icon
      icon="ph:caret-down-bold"
      class={["transition-transform duration-200", isOpen && "rotate-180"]}
    />
  </Select.Trigger>
  <Select.Content
    class={[
      "max-h-60 m-2 overflow-hidden flex items-center justify-between rounded-sm shadow-sm shadow-black/50 transition-[background-color] duration-200",
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
    forceMount
  >
    {#snippet child({ props, wrapperProps })}
      {#if isOpen}
        <div {...wrapperProps}>
          <div {...props} transition:slide={{ duration: 200 }}>
            <Select.Viewport>
              {#each items as { value, label, disabled } (value)}
                <Select.Item
                  {value}
                  {label}
                  {disabled}
                  class={[
                    "w-[var(--bits-select-anchor-width)] h-[var(--bits-select-anchor-height)] flex items-center justify-start gap-2 px-2 py-1 cursor-pointer transition-[background-color] duration-200",

                    variant === "base"
                      ? [
                          "t-dark:hover:bg-zinc-900",
                          "t-light:hover:bg-zinc-100",
                          "t-rust:hover:bg-rust-900",
                          "t-midnight:hover:bg-gray-900",
                        ]
                      : [
                          "t-dark:hover:bg-zinc-800",
                          "t-light:hover:bg-zinc-300",
                          "t-rust:hover:bg-rust-800",
                          "t-midnight:hover:bg-gray-800",
                        ],
                  ]}
                >
                  {#snippet children({ selected })}
                    {selected ? "✅" : ""}
                    {label}
                  {/snippet}
                </Select.Item>
              {/each}
            </Select.Viewport>
          </div>
        </div>
      {/if}
    {/snippet}
  </Select.Content>
</Select.Root>
