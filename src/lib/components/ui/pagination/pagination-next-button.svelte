<script lang="ts" module>
	export type NextButtonProps = WithoutChildren<PaginationPrimitive.NextButtonProps>;
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import ChevronRightIcon from "@tabler/icons-svelte/icons/chevron-right";

	import { cn, type WithoutChildren } from "$lib/utils.js";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, ...restProps }: NextButtonProps = $props();
</script>

<PaginationPrimitive.NextButton
	bind:ref
	aria-label="Go to next page"
	class={cn(Button.rootVariants({ variant: "ghost", size: "icon" }), className)}
	{...restProps}
>
	<span class="sr-only">Next</span>
	<ChevronRightIcon />
</PaginationPrimitive.NextButton>
