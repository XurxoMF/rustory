<script lang="ts" module>
	export type PortalProps = SheetPrimitive.PortalProps;
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<SheetPrimitive.Portal {...restProps} />
