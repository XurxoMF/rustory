<script lang="ts" module>
	export type MonthsProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: MonthsProps = $props();
</script>

<div bind:this={ref} class={cn("relative flex flex-col gap-4 md:flex-row", className)} {...restProps}>
	{@render children?.()}
</div>
