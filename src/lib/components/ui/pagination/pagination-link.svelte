<script lang="ts" module>
	export type LinkProps = PaginationPrimitive.PageProps & {
		size?: Button.RootSizes;
		isActive: boolean;
	};
</script>

<script lang="ts">
	import { Pagination as PaginationPrimitive } from "bits-ui";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	let { ref = $bindable(null), class: className, size = "icon", isActive, page, children, ...restProps }: LinkProps = $props();
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
	data-size={size}
	class={cn(Button.rootVariants({ size, variant: isActive ? "outline" : "ghost" }), "cn-pagination-link", className)}
	{...restProps}
>
	{#if children}
		{@render children?.()}
	{:else}
		{@render Fallback()}
	{/if}
</PaginationPrimitive.Page>
