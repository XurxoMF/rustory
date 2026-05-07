<script lang="ts" module>
	export type TitleProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: TitleProps = $props();
</script>

<div bind:this={ref} data-slot="empty-title" class={cn("text-sm font-medium tracking-tight", className)} {...restProps}>
	{@render children?.()}
</div>
