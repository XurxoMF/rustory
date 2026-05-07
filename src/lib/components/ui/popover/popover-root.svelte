<script lang="ts" module>
	export type RootProps = PopoverPrimitive.RootProps;
</script>

<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<PopoverPrimitive.Root bind:open {...restProps} />
