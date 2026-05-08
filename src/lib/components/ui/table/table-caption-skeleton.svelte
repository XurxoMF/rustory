<script lang="ts" module>
	export type CaptionSkeletonProps = WithoutChildrenOrChild<WithElementRef<HTMLAttributes<HTMLElement>>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef, type WithoutChildrenOrChild } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { ref = $bindable(null), class: className, ...restProps }: CaptionSkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 50) + 40}%`;
</script>

<caption bind:this={ref} data-slot="table-caption" class={cn("mt-4 text-sm text-muted-foreground", className)} {...restProps}>
	<Skeleton.Root class={cn("h-4.5 w-full max-w-(--skeleton-width) rounded-full", className)} style="--skeleton-width: {width};" />
</caption>
