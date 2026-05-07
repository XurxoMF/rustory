<script lang="ts" module>
	export type NestedProps = DrawerPrimitive.RootProps;
</script>

<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	let { shouldScaleBackground = true, open = $bindable(false), activeSnapPoint = $bindable(null), ...restProps }: NestedProps = $props();
</script>

<DrawerPrimitive.NestedRoot {shouldScaleBackground} bind:open bind:activeSnapPoint {...restProps} />
