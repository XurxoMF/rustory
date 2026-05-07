<script lang="ts" module>
	export type CloseProps = DrawerPrimitive.CloseProps;
</script>

<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	let { ref = $bindable(null), ...restProps }: CloseProps = $props();
</script>

<DrawerPrimitive.Close bind:ref data-slot="drawer-close" {...restProps} />
