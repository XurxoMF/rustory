<script lang="ts" module>
	export type PreviousProps = PaginationPrimitive.PrevButtonProps;
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, ...restProps }: PreviousProps = $props();
</script>

<PaginationPrimitive.PrevButton
	bind:ref
	aria-label="Go to previous page"
	class={cn(Button.rootVariants({ variant: "ghost", size: "icon" }), className)}
	{...restProps}
>
	<IconChevronLeft />
	<span class="cn-pagination-previous-text sr-only">Previous</span>
</PaginationPrimitive.PrevButton>
