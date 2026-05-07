<script lang="ts" module>
	export type LabelProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {};
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: LabelProps = $props();
</script>

<div bind:this={ref} data-slot="select-label" class={cn("px-1.5 py-1 text-xs text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</div>
