<script lang="ts" module>
	export type OrderedProps = WithElementRef<HTMLAttributes<HTMLOListElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: OrderedProps = $props();
</script>

<ol class={cn("ms-6 list-decimal [&>li]:mt-2", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</ol>
