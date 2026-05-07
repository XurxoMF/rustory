<script lang="ts" module>
	export type LeadingProps = WithElementRef<HTMLAttributes<HTMLParagraphElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: LeadingProps = $props();
</script>

<p class={cn("text-xl text-muted-foreground", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</p>
