<script lang="ts" module>
	export type LabelProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		inset?: boolean | undefined;
	};
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, inset, children, ...restProps }: LabelProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="context-menu-label"
	data-inset={inset}
	class={cn("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className)}
	{...restProps}
>
	{@render children?.()}
</div>
