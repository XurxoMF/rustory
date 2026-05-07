<script lang="ts" module>
	export type GridRowProps = CalendarPrimitive.GridRowProps;
</script>

<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: GridRowProps = $props();
</script>

<CalendarPrimitive.GridRow bind:ref class={cn("flex", className)} {...restProps} />
