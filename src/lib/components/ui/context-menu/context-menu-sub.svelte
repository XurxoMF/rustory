<script lang="ts" module>
	export type SubProps = ContextMenuPrimitive.SubProps;
</script>

<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: SubProps = $props();
</script>

<ContextMenuPrimitive.Sub bind:open {...restProps} />
