<script lang="ts" module>
	export type ItemProps = WithElementRef<HTMLAttributes<HTMLLIElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: ItemProps = $props();
</script>

<li class={cn("leading-7", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</li>
