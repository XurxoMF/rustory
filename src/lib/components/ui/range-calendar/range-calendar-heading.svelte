<script lang="ts" module>
	export type HeadingProps = RangeCalendarPrimitive.HeadingProps;
</script>

<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: HeadingProps = $props();
</script>

<RangeCalendarPrimitive.Heading bind:ref class={cn("px-(--cell-size) text-sm font-medium", className)} {...restProps} />
