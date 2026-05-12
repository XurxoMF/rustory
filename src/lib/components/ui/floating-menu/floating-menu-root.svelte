<script lang="ts" module>
	export type RootPositions = "bottom-right" | "top-left" | "top" | "top-right" | "right" | "bottom" | "bottom-left" | "left";
	export type RootOrientations = "horizontal" | "vertical";

	export type RootProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		position?: RootPositions | undefined;
		orientation?: RootOrientations | undefined;
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let {
		ref = $bindable(null),
		position = "bottom-right",
		orientation = "horizontal",
		class: className,
		children,
		...restProps
	}: RootProps = $props();
</script>

<div
	data-slot="floating-menu-root"
	data-position={position}
	data-orientation={orientation}
	bind:this={ref}
	class={cn(
		"group/floating-menu-root absolute z-20 m-3 flex flex-wrap items-center gap-1",
		"data-top-left:top-0 data-top-left:left-0 data-top-left:justify-start",
		"data-top:top-0 data-top:left-1/2 data-top:-translate-x-1/2 data-top:justify-center",
		"data-top-right:top-0 data-top-right:right-0 data-top-right:justify-end",
		"data-right:top-1/2 data-right:right-0 data-right:-translate-y-1/2 data-right:justify-end",
		"data-bottom-right:right-0 data-bottom-right:bottom-0 data-bottom-right:justify-end",
		"data-bottom:bottom-0 data-bottom:left-1/2 data-bottom:-translate-x-1/2 data-bottom:justify-center",
		"data-bottom-left:bottom-0 data-bottom-left:left-0 data-bottom-left:justify-start",
		"data-left:top-1/2 data-left:left-0 data-left:-translate-y-1/2 data-left:justify-start",
		"data-vertical:flex-col",
		"data-horizontal:flex-row",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
