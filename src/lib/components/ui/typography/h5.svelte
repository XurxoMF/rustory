<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLHeadingElement>> = $props();
</script>

<h5 class={cn("scroll-m-20 text-lg font-semibold tracking-tight", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</h5>
