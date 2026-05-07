<script lang="ts" module>
	export type ActionsProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: ActionsProps = $props();
</script>

<div bind:this={ref} data-slot="item-actions" class={cn("flex items-center gap-2", className)} {...restProps}>
	{@render children?.()}
</div>
