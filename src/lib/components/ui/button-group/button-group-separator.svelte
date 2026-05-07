<script lang="ts" module>
	export type SeparatorProps = Separator.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Separator from "$lib/components/ui/separator";

	let { ref = $bindable(null), class: className, orientation = "vertical", ...restProps }: SeparatorProps = $props();
</script>

<Separator.Root
	bind:ref
	data-slot="button-group-separator"
	{orientation}
	class={cn(
		"relative self-stretch bg-input data-[orientation=horizontal]:mx-px data-[orientation=horizontal]:w-auto data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto",
		className
	)}
	{...restProps}
/>
