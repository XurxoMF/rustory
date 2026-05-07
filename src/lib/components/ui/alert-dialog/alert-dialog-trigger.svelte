<script lang="ts" module>
	export type TriggerProps = AlertDialogPrimitive.TriggerProps;
</script>

<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: TriggerProps = $props();
</script>

<AlertDialogPrimitive.Trigger bind:ref data-slot="alert-dialog-trigger" {...restProps} />
