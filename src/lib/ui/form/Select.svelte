<script lang="ts">
  import { Select, type WithoutChildren } from "bits-ui";
  import { slide } from "svelte/transition";

  import Icon from "$lib/ui/base/Icon.svelte";

  type SelectProps = {
    value: string | undefined;
    placeholder: string;
    items: { value: string; label: string; disabled?: boolean }[];
  };

  let { value = $bindable(), items, placeholder, ...restProps }: SelectProps = $props();

  let isOpen = $state(false);

  const selectedLabel = $derived(items.find((item) => item.value === value)?.label);
</script>

<Select.Root type="single" bind:open={isOpen} onValueChange={(e) => (value = e)} {...restProps}>
  <Select.Trigger class="w-40 flex items-center justify-between gap-2 bg-red-500">
    {selectedLabel ? selectedLabel : placeholder}
    <Icon
      icon="ph:caret-down-bold"
      class={["transition-transform duration-200", isOpen && "rotate-180"]}
    />
  </Select.Trigger>
  <Select.Portal>
    <Select.Content class="w-40 m-2 bg-yellow-500" forceMount>
      {#snippet child({ open, props, wrapperProps })}
        {#if open}
          <div {...wrapperProps}>
            <div {...props} transition:slide={{ duration: 200 }}>
              <Select.ScrollUpButton>up</Select.ScrollUpButton>

              <Select.Viewport>
                {#each items as { value, label, disabled } (value)}
                  <Select.Item {value} {label} {disabled}>
                    {#snippet children({ selected })}
                      {selected ? "✅" : ""}
                      {label}
                    {/snippet}
                  </Select.Item>
                {/each}
              </Select.Viewport>

              <Select.ScrollDownButton>down</Select.ScrollDownButton>
            </div>
          </div>
        {/if}
      {/snippet}
    </Select.Content>
  </Select.Portal>
</Select.Root>
