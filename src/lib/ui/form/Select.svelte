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
  };

  let { value = $bindable(), onValueChange, items, placeholder }: SelectProps = $props();

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
      "w-full flex items-center justify-between gap-2 px-2 py-1 rounded-sm cursor-pointer border transition-[border] duration-200",
      "t-dark:border-zinc-800",
      "t-light:border-zinc-300",
      "t-rust:border-rust-800",
      "t-midnight:border-gray-800",
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
      "max-h-60 m-1 z-50 overflow-hidden flex items-center justify-between rounded-sm shadow-sm shadow-black/25 border transition-[border] duration-200",
      "t-dark:border-zinc-800",
      "t-light:border-zinc-300",
      "t-rust:border-rust-800",
      "t-midnight:border-gray-800",
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
                    "w-[var(--bits-select-anchor-width)] h-[var(--bits-select-anchor-height)] flex items-center justify-start gap-2 px-2 py-1 cursor-pointer not-last:border-b transition-[babcground-color] duration-200",
                    "t-dark:not-last:border-b-zinc-800 t-dark:bg-zinc-900",
                    "t-light:not-last:border-b-zinc-300 t-light:bg-zinc-100",
                    "t-rust:not-last:border-b-rust-800 t-rust:bg-rust-900",
                    "t-midnight:not-last:border-b-gray-800 t-midnight:bg-gray-900",
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
