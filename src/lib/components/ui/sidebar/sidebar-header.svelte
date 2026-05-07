<script lang="ts" module>
	export type HeaderProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: HeaderProps = $props();
</script>

<div bind:this={ref} data-slot="sidebar-header" data-sidebar="header" class={cn("flex flex-col gap-2 p-2", className)} {...restProps}>
	{@render children?.()}
</div>
