<script lang="ts" module>
	export type TriggerProps = MenubarPrimitive.TriggerProps;
</script>

<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: TriggerProps = $props();
</script>

<MenubarPrimitive.Trigger
	bind:ref
	data-slot="menubar-trigger"
	class={cn(
		"flex items-center rounded-sm px-1.5 py-0.5 text-sm font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted",
		className
	)}
	{...restProps}
/>
