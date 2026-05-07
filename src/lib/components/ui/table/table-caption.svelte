<script lang="ts" module>
	export type CaptionProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: CaptionProps = $props();
</script>

<caption bind:this={ref} data-slot="table-caption" class={cn("mt-4 text-sm text-muted-foreground", className)} {...restProps}>
	{@render children?.()}
</caption>
