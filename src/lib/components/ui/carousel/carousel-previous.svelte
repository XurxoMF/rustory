<script lang="ts" module>
	export type PreviousProps = WithoutChildren<Button.RootProps>;
</script>

<script lang="ts">
	import type { WithoutChildren } from "bits-ui";

	import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	import * as Carousel from ".";

	let { ref = $bindable(null), class: className, variant = "outline", size = "icon-sm", ...restProps }: PreviousProps = $props();

	const emblaCtx = Carousel.getEmblaContext("<Carousel.Previous/>");
</script>

<Button.Root
	data-slot="carousel-previous"
	{variant}
	{size}
	aria-disabled={!emblaCtx.canScrollPrev}
	disabled={!emblaCtx.canScrollPrev}
	class={cn(
		"absolute touch-manipulation rounded-full",
		emblaCtx.orientation === "horizontal" ? "-inset-s-12 top-1/2 -translate-y-1/2" : "inset-s-1/2 -top-12 -translate-x-1/2 rotate-90",
		className
	)}
	onclick={emblaCtx.scrollPrev}
	onkeydown={emblaCtx.handleKeyDown}
	{...restProps}
	bind:ref
>
	<IconChevronLeft />
	<span class="sr-only">Previous slide</span>
</Button.Root>
