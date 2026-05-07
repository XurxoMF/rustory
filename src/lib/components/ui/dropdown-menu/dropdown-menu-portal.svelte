<script lang="ts" module>
	export type PortalProps = DropdownMenuPrimitive.PortalProps;
</script>

<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<DropdownMenuPrimitive.Portal {...restProps} />
