<script lang="ts" module>
	export type RootProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: RootProps = $props();
</script>

<nav bind:this={ref} data-slot="breadcrumb" aria-label="breadcrumb" class={cn("cn-breadcrumb", className)} {...restProps}>
	{@render children?.()}
</nav>
