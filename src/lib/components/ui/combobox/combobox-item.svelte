<script lang="ts" module>
	export type ItemProps = {
		value: string;
		class?: string | undefined;
		children: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from "svelte";

	import IconCheck from "@tabler/icons-svelte/icons/check";

	import { cn } from "$lib/utils";

	import * as Command from "$lib/components/ui/command";

	import { getComboboxContext } from "./combobox-context.svelte";

	let { value, class: className, children }: ItemProps = $props();

	const ctx = getComboboxContext();
</script>

<Command.Item
	{value}
	onSelect={() => ctx.selectItem(value)}
	class={cn(
		"relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
		className
	)}
>
	{@render children()}

	<span class="absolute inset-e-2 flex size-3.5 items-center justify-center">
		{#if ctx.isSelected(value)}
			<IconCheck class="cn-select-item-indicator-icon" />
		{/if}
	</span>
</Command.Item>
