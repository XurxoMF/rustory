<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLUListElement>> = $props();
</script>

<ul class={cn("ms-6 list-disc [&>li]:mt-2", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</ul>
