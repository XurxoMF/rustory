<script lang="ts" module>
	export type H1Props = WithElementRef<HTMLAttributes<HTMLHeadingElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: H1Props = $props();
</script>

<h1 class={cn("scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</h1>
