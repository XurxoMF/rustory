<script lang="ts" module>
	export type MenuSkeletonProps = WithElementRef<HTMLAttributes<HTMLElement>> & {};
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let {
		ref = $bindable(null),
		class: className,
		showIcon = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		showIcon?: boolean;
	} = $props();

	// Random width between 50% and 90%
	const width = `${Math.floor(Math.random() * 40) + 50}%`;
</script>

<div
	bind:this={ref}
	data-slot="sidebar-menu-skeleton"
	data-sidebar="menu-skeleton"
	class={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
	{...restProps}
>
	{#if showIcon}
		<Skeleton.Root class="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
	{/if}
	<Skeleton.Root class="h-4 max-w-(--skeleton-width) flex-1" data-sidebar="menu-skeleton-text" style="--skeleton-width: {width};" />
	{@render children?.()}
</div>
