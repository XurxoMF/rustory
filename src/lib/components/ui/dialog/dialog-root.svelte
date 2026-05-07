<script lang="ts" module>
	export type RootProps = DialogPrimitive.RootProps;
</script>

<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<DialogPrimitive.Root bind:open {...restProps} />
