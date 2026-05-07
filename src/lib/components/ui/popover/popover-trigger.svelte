<script lang="ts" module>
	export type TriggerProps = PopoverPrimitive.TriggerProps;
</script>

<script lang="ts">
	import { Popover as PopoverPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: TriggerProps = $props();
</script>

<PopoverPrimitive.Trigger bind:ref data-slot="popover-trigger" class={cn("", className)} {...restProps} />
