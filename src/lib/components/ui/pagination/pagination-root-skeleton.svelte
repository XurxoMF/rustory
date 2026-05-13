<script lang="ts" module>
	export type RootSkeletonProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: RootSkeletonProps = $props();
</script>

<div
	bind:this={ref}
	role="navigation"
	aria-label="pagination"
	data-slot="pagination"
	class={cn("mx-auto flex w-full justify-center", className)}
	{...restProps}
>
	{@render children?.()}
</div>
