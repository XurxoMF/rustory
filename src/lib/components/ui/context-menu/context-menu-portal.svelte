<script lang="ts" module>
	export type PortalProps = ContextMenuPrimitive.PortalProps;
</script>

<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<ContextMenuPrimitive.Portal {...restProps} />
