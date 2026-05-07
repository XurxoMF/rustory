<script lang="ts" module>
	export type H4Props = WithElementRef<HTMLAttributes<HTMLHeadingElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: H4Props = $props();
</script>

<h4 class={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</h4>
