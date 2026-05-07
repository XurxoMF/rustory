<script lang="ts" module>
	export type GridBodyProps = CalendarPrimitive.GridBodyProps;
</script>

<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: GridBodyProps = $props();
</script>

<CalendarPrimitive.GridBody bind:ref class={cn(className)} {...restProps} />
