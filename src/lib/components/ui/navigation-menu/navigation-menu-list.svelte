<script lang="ts" module>
	export type ListProps = NavigationMenuPrimitive.ListProps;
</script>

<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: ListProps = $props();
</script>

<NavigationMenuPrimitive.List
	bind:ref
	data-slot="navigation-menu-list"
	class={cn("group flex flex-1 list-none items-center justify-center gap-0", className)}
	{...restProps}
/>
