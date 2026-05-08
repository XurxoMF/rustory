<script lang="ts" module>
	export type RootProps = NavigationMenuPrimitive.RootProps & {
		viewport?: boolean | undefined;
	};
</script>

<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";

	import MenuViewport from "./navigation-menu-viewport.svelte";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, viewport = true, children, ...restProps }: RootProps = $props();
</script>

<NavigationMenuPrimitive.Root
	bind:ref
	data-slot="navigation-menu"
	data-viewport={viewport}
	class={cn("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className)}
	{...restProps}
>
	{@render children?.()}
	{#if viewport}
		<MenuViewport />
	{/if}
</NavigationMenuPrimitive.Root>
