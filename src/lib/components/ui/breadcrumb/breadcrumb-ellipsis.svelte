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
	data-slot="breadcrumb-ellipsis"
	role="presentation"
	aria-hidden="true"
	class={cn("flex size-5 items-center justify-center [&>svg]:size-4", className)}
	{...restProps}
>
	<IconDots />
	<span class="sr-only">More</span>
</span>
