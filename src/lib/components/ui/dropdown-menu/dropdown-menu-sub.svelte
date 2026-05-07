<script lang="ts" module>
	export type SubProps = DropdownMenuPrimitive.SubProps;
</script>

<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: SubProps = $props();
</script>

<DropdownMenuPrimitive.Sub bind:open {...restProps} />
