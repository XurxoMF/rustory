<script lang="ts" module>
	export type NextProps = WithoutChildren<Button.RootProps>;
</script>

<script lang="ts">
	import type { WithoutChildren } from "bits-ui";

	import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";

	import * as Carousel from ".";

	let { ref = $bindable(null), class: className, variant = "outline", size = "icon-sm", ...restProps }: NextProps = $props();

	const emblaCtx = Carousel.getEmblaContext("<Carousel.Next/>");
</script>

<Button.Root
	data-slot="carousel-next"
	{variant}
	{size}
	aria-disabled={!emblaCtx.canScrollNext}
	disabled={!emblaCtx.canScrollNext}
	class={cn(
		"absolute touch-manipulation rounded-full",
		emblaCtx.orientation === "horizontal" ? "-inset-e-12 top-1/2 -translate-y-1/2" : "inset-s-1/2 -bottom-12 -translate-x-1/2 rotate-90",
		className
	)}
	onclick={emblaCtx.scrollNext}
	onkeydown={emblaCtx.handleKeyDown}
	bind:ref
	{...restProps}
>
	<IconChevronRight />
	<span class="sr-only">Next slide</span>
</Button.Root>
