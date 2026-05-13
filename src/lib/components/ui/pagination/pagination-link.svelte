<script lang="ts" module>
	export type LinkProps = PaginationPrimitive.PageProps & {
		isActive: boolean | undefined;
	};
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, isActive, page, children, ...restProps }: LinkProps = $props();
</script>

{#snippet Fallback()}
	{page.value}
{/snippet}

<PaginationPrimitive.Page
	bind:ref
	{page}
	aria-current={isActive ? "page" : undefined}
	data-slot="pagination-link"
	data-active={isActive}
	class={cn(Button.rootVariants({ size: "icon", variant: isActive ? "outline" : "ghost" }), "cn-pagination-link", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.Page>
