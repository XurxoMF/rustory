<script lang="ts" module>
	export type RootProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: RootProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="empty"
	class={cn("flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border-dashed p-6 text-center text-balance", className)}
	{...restProps}
>
	{@render children?.()}
</div>
