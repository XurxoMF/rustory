<script lang="ts" module>
	export type ItemProps = NavigationMenuPrimitive.ItemProps;
</script>

<script lang="ts">
	import { NavigationMenu as NavigationMenuPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: ItemProps = $props();
</script>

<NavigationMenuPrimitive.Item bind:ref data-slot="navigation-menu-item" class={cn("cn-navigation-menu-item relative", className)} {...restProps} />
