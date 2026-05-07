<script lang="ts" module>
	export type TriggerProps = TooltipPrimitive.TriggerProps;
</script>

<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: TriggerProps = $props();
</script>

<TooltipPrimitive.Trigger bind:ref data-slot="tooltip-trigger" {...restProps} />
