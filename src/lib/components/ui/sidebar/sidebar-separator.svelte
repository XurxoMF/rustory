<script lang="ts" module>
	export type SeparatorProps = Separator.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Separator from "$lib/components/ui/separator";

	let { ref = $bindable(null), class: className, ...restProps }: SeparatorProps = $props();
</script>

<Separator.Root
	bind:ref
	data-slot="sidebar-separator"
	data-sidebar="separator"
	class={cn("mx-2 w-auto bg-sidebar-border", className)}
	{...restProps}
/>
