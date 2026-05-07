<script lang="ts" module>
	export type HeaderProps = WithElementRef<HTMLAttributes<HTMLTableSectionElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: HeaderProps = $props();
</script>

<thead bind:this={ref} data-slot="table-header" class={cn("[&_tr]:border-b", className)} {...restProps}>
	{@render children?.()}
</thead>
