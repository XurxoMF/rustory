<script lang="ts" module>
	export type GroupProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: GroupProps = $props();
</script>

<kbd bind:this={ref} data-slot="kbd-group" class={cn("inline-flex items-center gap-1", className)} {...restProps}>
	{@render children?.()}
</kbd>
