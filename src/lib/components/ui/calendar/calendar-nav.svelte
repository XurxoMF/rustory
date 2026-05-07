<script lang="ts" module>
	export type NavProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: NavProps = $props();
</script>

<nav {...restProps} bind:this={ref} class={cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", className)}>
	{@render children?.()}
</nav>
