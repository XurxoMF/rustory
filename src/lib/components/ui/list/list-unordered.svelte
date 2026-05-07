<script lang="ts" module>
	export type UnorderedProps = WithElementRef<HTMLAttributes<HTMLUListElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: UnorderedProps = $props();
</script>

<ul class={cn("ms-6 list-disc [&>li]:mt-2", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</ul>
