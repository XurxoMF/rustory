<script lang="ts" module>
	export type LabelProps = WithElementRef<HTMLAttributes<HTMLElement>> & {
		inset?: boolean;
	};
</script>

<script lang="ts">
	import { type WithElementRef } from "bits-ui";
	import type { HTMLAttributes } from "svelte/elements";

	import { cn } from "$lib/utils";

	let { ref = $bindable(null), inset, children, class: className, ...restProps }: LabelProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="menubar-label"
	data-inset={inset}
	class={cn("px-1.5 py-1 text-sm font-medium data-inset:pl-7", className)}
	{...restProps}
>
	{@render children?.()}
</div>
