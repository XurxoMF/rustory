<script lang="ts" module>
	export type RootProps = WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils";

	let { ref = $bindable(null), class: className, ...restProps }: RootProps = $props();
</script>

<div bind:this={ref} data-slot="skeleton" class={cn("animate-pulse rounded-md bg-muted", className)} {...restProps}></div>
