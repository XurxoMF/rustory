<script lang="ts" module>
	export type NextButtonProps = PaginationPrimitive.NextButtonProps;
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import ChevronRightIcon from "@tabler/icons-svelte/icons/chevron-right";

	import { cn } from "$lib/utils.js";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, children, ...restProps }: NextButtonProps = $props();
</script>

{#snippet Fallback()}
	<span>Next</span>
	<ChevronRightIcon class={cn("size-4", className)} />
{/snippet}

<PaginationPrimitive.NextButton
	bind:ref
	aria-label="Go to next page"
	class={cn(Button.rootVariants({ variant: "ghost" }), "pr-2!", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.NextButton>
