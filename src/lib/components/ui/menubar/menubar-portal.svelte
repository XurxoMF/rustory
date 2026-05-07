<script lang="ts" module>
	export type PortalProps = MenubarPrimitive.PortalProps;
</script>

<script lang="ts">
	import { Menubar as MenubarPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<MenubarPrimitive.Portal {...restProps} />
