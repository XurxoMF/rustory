<script lang="ts" module>
	export type CloseProps = DialogPrimitive.CloseProps;
</script>

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	let { ref = $bindable(null), type = "button", ...restProps }: CloseProps = $props();
</script>

<DialogPrimitive.Close bind:ref data-slot="dialog-close" {type} {...restProps} />
