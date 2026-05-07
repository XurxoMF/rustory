<script lang="ts" module>
	export type RootApi = CommandPrimitive.Root;

	export type RootProps = CommandPrimitive.RootProps & {
		api?: RootApi | null;
	};
</script>

<script lang="ts">
	import { Command as CommandPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { api = $bindable(null), ref = $bindable(null), value = $bindable(""), class: className, ...restProps }: RootProps = $props();
</script>

<CommandPrimitive.Root
	bind:this={api}
	bind:value
	bind:ref
	data-slot="command"
	class={cn("flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground", className)}
	{...restProps}
/>
