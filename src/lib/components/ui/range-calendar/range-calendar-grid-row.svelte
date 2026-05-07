<script lang="ts" module>
	export type GridRowProps = RangeCalendarPrimitive.GridRowProps;
</script>

<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: GridRowProps = $props();
</script>

<RangeCalendarPrimitive.GridRow bind:ref class={cn("flex", className)} {...restProps} />
