<script lang="ts" module>
	export type GroupProps = ContextMenuPrimitive.GroupProps;
</script>

<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: GroupProps = $props();
</script>

<ContextMenuPrimitive.Group bind:ref data-slot="context-menu-group" {...restProps} />
