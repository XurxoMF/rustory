<script lang="ts" module>
	export type H6Props = WithElementRef<HTMLAttributes<HTMLHeadingElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: H6Props = $props();
</script>

<h6 class={cn("scroll-m-20 text-base font-semibold tracking-tight", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</h6>
