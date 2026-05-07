<script lang="ts" module>
	export type ProviderProps = TooltipPrimitive.ProviderProps;
</script>

<script lang="ts">
	import { Tooltip as TooltipPrimitive } from "bits-ui";

	let { delayDuration = 0, ...restProps }: ProviderProps = $props();
</script>

<TooltipPrimitive.Provider {delayDuration} {...restProps} />
