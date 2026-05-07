<script lang="ts" module>
	export type RootProps = DrawerPrimitive.RootProps;
</script>

<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	let { shouldScaleBackground = true, open = $bindable(false), activeSnapPoint = $bindable(null), ...restProps }: RootProps = $props();
</script>

<DrawerPrimitive.Root {shouldScaleBackground} bind:open bind:activeSnapPoint {...restProps} />
