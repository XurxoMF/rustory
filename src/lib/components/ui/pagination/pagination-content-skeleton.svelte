<script lang="ts" module>
	export type ContentSkeletonProps = WithElementRef<HTMLAttributes<HTMLUListElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: ContentSkeletonProps = $props();
</script>

<ul bind:this={ref} data-slot="pagination-content" class={cn("flex items-center gap-0.5", className)} {...restProps}>
	{@render children?.()}
</ul>
