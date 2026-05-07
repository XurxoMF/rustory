<script lang="ts" module>
	export type TriggerProps = DialogPrimitive.TriggerProps;
</script>

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	let { ref = $bindable(null), type = "button", ...restProps }: TriggerProps = $props();
</script>

<DialogPrimitive.Trigger bind:ref data-slot="dialog-trigger" {type} {...restProps} />
