<script lang="ts" module>
	export type NextProps = PaginationPrimitive.NextButtonProps;
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, ...restProps }: NextProps = $props();
</script>

<PaginationPrimitive.NextButton
	bind:ref
	aria-label="Go to next page"
	class={cn(Button.rootVariants({ variant: "ghost", size: "icon" }), className)}
	{...restProps}
>
	<span class="cn-pagination-next-text sr-only">Next</span>
	<IconChevronRight />
</PaginationPrimitive.NextButton>
