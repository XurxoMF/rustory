<script lang="ts" module>
	export type LinkProps = WithElementRef<HTMLAnchorAttributes>;
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, children, ...restProps }: LinkProps = $props();
</script>

<a class={cn("font-medium text-primary underline underline-offset-4", className)} bind:this={ref} {...restProps}>
	{@render children?.()}
</a>
