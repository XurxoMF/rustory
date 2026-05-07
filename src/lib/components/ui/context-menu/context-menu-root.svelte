<script lang="ts" module>
	export type RootProps = ContextMenuPrimitive.RootProps;
</script>

<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<ContextMenuPrimitive.Root bind:open {...restProps} />
