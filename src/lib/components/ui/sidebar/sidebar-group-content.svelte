<script lang="ts" module>
	export type GroupContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: GroupContentProps = $props();
</script>

<div bind:this={ref} data-slot="sidebar-group-content" data-sidebar="group-content" class={cn("w-full text-sm", className)} {...restProps}>
	{@render children?.()}
</div>
