<script lang="ts" module>
	export type GridBodyProps = RangeCalendarPrimitive.GridBodyProps;
</script>

<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";

	let { ref = $bindable(null), ...restProps }: GridBodyProps = $props();
</script>

<RangeCalendarPrimitive.GridBody bind:ref {...restProps} />
