<script lang="ts" module>
	export type PortalProps = PopoverPrimitive.PortalProps;
</script>

<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<PopoverPrimitive.Portal {...restProps} />
