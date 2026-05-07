<script lang="ts" module>
	export type ListProps = CommandPrimitive.ListProps;
</script>

<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: ListProps = $props();
</script>

<CommandPrimitive.List
	bind:ref
	data-slot="command-list"
	class={cn("no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none", className)}
	{...restProps}
/>
