<script lang="ts" module>
	export type ItemProps = WithElementRef<HTMLLiAttributes>;
</script>

<script lang="ts">
	import type { HTMLLiAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: ItemProps = $props();
</script>

<li bind:this={ref} data-slot="breadcrumb-item" class={cn("inline-flex items-center gap-1", className)} {...restProps}>
	{@render children?.()}
</li>
