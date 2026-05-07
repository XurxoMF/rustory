<script lang="ts" module>
	export type DescriptionProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: DescriptionProps = $props();
</script>

<div bind:this={ref} data-slot="popover-description" class={cn("text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</div>
