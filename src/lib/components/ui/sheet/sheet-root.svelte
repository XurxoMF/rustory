<script lang="ts" module>
	export type RootProps = SheetPrimitive.RootProps;
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<SheetPrimitive.Root bind:open {...restProps} />
