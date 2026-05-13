<script lang="ts" module>
	export type PrevButtonProps = WithoutChildren<PaginationPrimitive.PrevButtonProps>;
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import ChevronLeftIcon from "@tabler/icons-svelte/icons/chevron-left";

	import { cn, type WithoutChildren } from "$lib/utils.js";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, ...restProps }: PrevButtonProps = $props();
</script>

<PaginationPrimitive.PrevButton
	bind:ref
	aria-label="Go to previous page"
	class={cn(Button.rootVariants({ variant: "ghost", size: "icon" }), className)}
	{...restProps}
>
	<ChevronLeftIcon />
	<span class="sr-only">Previous</span>
</PaginationPrimitive.PrevButton>
