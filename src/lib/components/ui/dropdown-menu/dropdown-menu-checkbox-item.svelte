<script lang="ts" module>
	export type CheckboxItemProps = WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
		children?: Snippet | undefined;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	import IconMinus from "@tabler/icons-svelte/icons/minus";
	import IconCheck from "@tabler/icons-svelte/icons/check";

	import { cn, type WithoutChildrenOrChild } from "$lib/utils";

	let {
		ref = $bindable(null),
		checked = $bindable(false),
		indeterminate = $bindable(false),
		class: className,
		children: childrenProp,
		...restProps
	}: CheckboxItemProps = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
	bind:ref
	bind:checked
	bind:indeterminate
	data-slot="dropdown-menu-checkbox-item"
	class={cn(
		"relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		<span class="pointer-events-none absolute right-2 flex items-center justify-center" data-slot="dropdown-menu-checkbox-item-indicator">
			{#if indeterminate}
				<IconMinus />
			{:else if checked}
				<IconCheck />
			{/if}
		</span>
		{@render childrenProp?.()}
	{/snippet}
</DropdownMenuPrimitive.CheckboxItem>
