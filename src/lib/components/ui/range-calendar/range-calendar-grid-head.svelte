<script lang="ts" module>
	export type GridHeadProps = RangeCalendarPrimitive.GridHeadProps;
</script>

<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: GridHeadProps = $props();
</script>

<RangeCalendarPrimitive.GridHead bind:ref {...restProps} />
