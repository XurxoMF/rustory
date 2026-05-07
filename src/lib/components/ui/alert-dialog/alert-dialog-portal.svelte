<script lang="ts" module>
	export type PortalProps = AlertDialogPrimitive.PortalProps;
</script>

<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	let { ...restProps }: PortalProps = $props();
</script>

<AlertDialogPrimitive.Portal {...restProps} />
