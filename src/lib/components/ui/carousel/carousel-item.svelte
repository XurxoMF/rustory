<script lang="ts" module>
	export type ItemProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	import * as Carousel from ".";

	let { ref = $bindable(null), class: className, children, ...restProps }: ItemProps = $props();

	const emblaCtx = Carousel.getEmblaContext("<Carousel.Item/>");
</script>

<div
	bind:this={ref}
	data-slot="carousel-item"
	role="group"
	aria-roledescription="slide"
	class={cn("min-w-0 shrink-0 grow-0 basis-full", emblaCtx.orientation === "horizontal" ? "ps-4" : "pt-4", className)}
	data-embla-slide=""
	{...restProps}
>
	{@render children?.()}
</div>
