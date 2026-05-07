<script lang="ts" module>
	export type PortalProps = DialogPrimitive.PortalProps;
</script>

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<DialogPrimitive.Portal {...restProps} />
