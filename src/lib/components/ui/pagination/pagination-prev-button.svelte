<script lang="ts" module>
	export type PrevButtonProps = PaginationPrimitive.PrevButtonProps;
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import ChevronLeftIcon from "@tabler/icons-svelte/icons/chevron-left";

	import { cn } from "$lib/utils.js";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, children, ...restProps }: PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<ChevronLeftIcon class={cn("size-4", className)} />
	<span>Previous</span>
{/snippet}

<PaginationPrimitive.PrevButton
	bind:ref
	aria-label="Go to previous page"
	class={cn(Button.rootVariants({ variant: "ghost" }), "pl-2!", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.PrevButton>
