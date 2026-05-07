<script lang="ts" module>
	export type SubTriggerProps = WithoutChild<ContextMenuPrimitive.SubTriggerProps> & {
		inset?: boolean;
	};
</script>

<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

	import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

	import { cn, type WithoutChild } from "$lib/utils";

	let { ref = $bindable(null), class: className, inset, children, ...restProps }: SubTriggerProps = $props();
</script>

<ContextMenuPrimitive.SubTrigger
	bind:ref
	data-slot="context-menu-sub-trigger"
	data-inset={inset}
	class={cn(
		"flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-inset:ps-8 data-inset:pl-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<IconChevronRight class="ml-auto" />
</ContextMenuPrimitive.SubTrigger>
