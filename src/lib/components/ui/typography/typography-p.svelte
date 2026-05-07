<script lang="ts" module>
	export type PProps = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: PProps = $props();
</script>

<p class={cn("leading-7", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</p>
