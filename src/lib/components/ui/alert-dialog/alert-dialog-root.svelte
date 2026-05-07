<script lang="ts" module>
	export type RootProps = AlertDialogPrimitive.RootProps;
</script>

<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<AlertDialogPrimitive.Root bind:open {...restProps} />
