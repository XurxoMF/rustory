<script lang="ts" module>
	export type PortalProps = TooltipPrimitive.PortalProps;
</script>

<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<TooltipPrimitive.Portal {...restProps} />
