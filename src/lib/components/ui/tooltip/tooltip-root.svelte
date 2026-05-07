<script lang="ts" module>
	export type RootProps = TooltipPrimitive.RootProps;
</script>

<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";

	let { open = $bindable(false), ...restProps }: RootProps = $props();
</script>

<TooltipPrimitive.Root bind:open {...restProps} />
