<script lang="ts" module>
	export type RootProps = WithElementRef<HTMLTableAttributes>;
</script>

<script lang="ts">
	import type { HTMLTableAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	import * as ScrollArea from "$lib/components/ui/scroll-area";

	let { ref = $bindable(null), class: className, children, ...restProps }: RootProps = $props();
</script>

<ScrollArea.Root data-slot="table-container" class="relative w-full" orientation="horizontal">
	<table bind:this={ref} data-slot="table" class={cn("w-full caption-bottom text-sm", className)} {...restProps}>
		{@render children?.()}
	</table>
</ScrollArea.Root>
