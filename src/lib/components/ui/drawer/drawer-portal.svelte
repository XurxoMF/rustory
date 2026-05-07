<script lang="ts" module>
	export type PortalProps = DrawerPrimitive.PortalProps;
</script>

<script lang="ts">
	import { Drawer as DrawerPrimitive } from "vaul-svelte";

	let { ...restProps }: PortalProps = $props();
</script>

<DrawerPrimitive.Portal {...restProps} />
