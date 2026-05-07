<script lang="ts" module>
	export type HeaderProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: HeaderProps = $props();
</script>

<div bind:this={ref} data-slot="empty-header" class={cn("flex max-w-sm flex-col items-center gap-2", className)} {...restProps}>
	{@render children?.()}
</div>
