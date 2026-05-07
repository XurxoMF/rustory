<script lang="ts" module>
	export type FooterProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: FooterProps = $props();
</script>

<div bind:this={ref} data-slot="sidebar-footer" data-sidebar="footer" class={cn("flex flex-col gap-2 p-2", className)} {...restProps}>
	{@render children?.()}
</div>
