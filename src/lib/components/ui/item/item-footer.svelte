<script lang="ts" module>
	export type FooterProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: FooterProps = $props();
</script>

<div bind:this={ref} data-slot="item-footer" class={cn("flex basis-full items-center justify-between gap-2", className)} {...restProps}>
	{@render children?.()}
</div>
