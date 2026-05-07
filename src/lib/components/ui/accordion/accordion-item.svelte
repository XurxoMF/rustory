<script lang="ts" module>
	export type ItemProps = AccordionPrimitive.ItemProps;
</script>

<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: ItemProps = $props();
</script>

<AccordionPrimitive.Item bind:ref data-slot="accordion-item" class={cn("not-last:border-b", className)} {...restProps} />
