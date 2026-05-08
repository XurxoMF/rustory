<script lang="ts" module>
	export type CellSkeletonProps = WithoutChildrenOrChild<WithElementRef<HTMLTdAttributes>>;
</script>

<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements";

	import { cn, type WithElementRef, type WithoutChildrenOrChild } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { ref = $bindable(null), class: className, ...restProps }: CellSkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 50) + 40}%`;
</script>

<td bind:this={ref} data-slot="table-cell" class={cn("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0", className)} {...restProps}>
	<Skeleton.Root class={cn("h-4.5 w-full max-w-(--skeleton-width) rounded-full", className)} style="--skeleton-width: {width};" />
</td>
