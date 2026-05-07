<script lang="ts" module>
	export type EllipsisProps = WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import IconDots from "@tabler/icons-svelte/icons/dots";

	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: EllipsisProps = $props();
</script>

<span
	bind:this={ref}
	aria-hidden="true"
	data-slot="pagination-ellipsis"
	class={cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
	{...restProps}
>
	<IconDots />
	<span class="sr-only">More pages</span>
</span>
