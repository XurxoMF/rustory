<script lang="ts" module>
	export type HeadProps = WithElementRef<HTMLThAttributes>;
</script>

<script lang="ts">
	import type { HTMLThAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: HeadProps = $props();
</script>

<th
	bind:this={ref}
	data-slot="table-head"
	class={cn("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0", className)}
	{...restProps}
>
	{@render children?.()}
</th>
