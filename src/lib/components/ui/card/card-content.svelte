<script lang="ts" module>
	export type ContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: ContentProps = $props();
</script>

<div bind:this={ref} data-slot="card-content" class={cn("px-4 group-data-[size=sm]/card:px-3", className)} {...restProps}>
	{@render children?.()}
</div>
