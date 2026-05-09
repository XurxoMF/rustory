<script lang="ts" module>
	export type ListSkeletonProps = HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn } from "$lib/utils";

	let { class: className, children, ...restProps }: ListSkeletonProps = $props();
</script>

<div
	class={cn(
		"group/tabs-list inline-flex w-fit items-center justify-center gap-1 rounded-lg p-0.75 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col group-data-horizontal/tabs:h-8 data-[variant=line]:rounded-none",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
