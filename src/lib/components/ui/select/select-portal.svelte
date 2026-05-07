<script lang="ts" module>
	export type PortalProps = SelectPrimitive.PortalProps;
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<SelectPrimitive.Portal {...restProps} />
