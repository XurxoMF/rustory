<script lang="ts" module>
	export type GroupProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: GroupProps = $props();
</script>

<div
	data-slot="floating-menu-group"
	bind:this={ref}
	class={cn(
		"group/floating-menu-group group-group-data- flex flex-wrap items-center gap-1 rounded-xl bg-popover/90 p-1 shadow shadow-background",
		"group-data-top-left/floating-menu-root:justify-start",
		"group-data-top/floating-menu-root:justify-center",
		"group-data-top-right/floating-menu-root:justify-end",
		"group-data-right/floating-menu-root:justify-end",
		"group-data-bottom-right/floating-menu-root:justify-end",
		"group-data-bottom/floating-menu-root:justify-center",
		"group-data-bottom-left/floating-menu-root:justify-start",
		"group-data-left/floating-menu-root:justify-start",
		"group-data-vertical/floating-menu-root:flex-col",
		"group-data-horizontal/floating-menu-root:flex-row",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
