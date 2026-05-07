<script lang="ts" module>
	export type RootProps = DropdownMenuPrimitive.RootProps;
</script>

<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<DropdownMenuPrimitive.Root bind:open {...restProps} />
