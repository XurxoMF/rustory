<script lang="ts" module>
	export type ContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: ContentProps = $props();
</script>

<div bind:this={ref} data-slot="field-content" class={cn("group/field-content flex flex-1 flex-col gap-0.5 leading-snug", className)} {...restProps}>
	{@render children?.()}
</div>
