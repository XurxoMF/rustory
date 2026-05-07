<script lang="ts" module>
	export type MonthProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { type WithElementRef, cn } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: MonthProps = $props();
</script>

<div {...restProps} bind:this={ref} class={cn("flex w-full flex-col gap-4", className)}>
	{@render children?.()}
</div>
