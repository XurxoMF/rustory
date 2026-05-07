<script lang="ts" module>
	export type PortalProps = HoverCardPrimitive.PortalProps;
</script>

<script lang="ts">
	import { LinkPreview as HoverCardPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<HoverCardPrimitive.Portal {...restProps} />
