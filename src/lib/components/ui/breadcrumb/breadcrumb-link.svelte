<script lang="ts" module>
	export type LinkProps = WithElementRef<HTMLAnchorAttributes> & {
		child?: Snippet<[{ props: HTMLAnchorAttributes }]> | undefined;
	};
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, href = undefined, child, children, ...restProps }: LinkProps = $props();

	const attrs = $derived({
		"data-slot": "breadcrumb-link",
		class: cn("hover:text-foreground transition-colors", className),
		href,
		...restProps
	});
</script>

{#if child}
	{@render child({ props: attrs })}
{:else}
	<a bind:this={ref} {...attrs}>
		{@render children?.()}
	</a>
{/if}
