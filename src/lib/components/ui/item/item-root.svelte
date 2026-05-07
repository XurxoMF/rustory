<script lang="ts" module>
	export const rootVariants = tv({
		base: "[a]:hover:bg-muted rounded-lg border text-sm group/item focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-wrap items-center transition-colors duration-100 outline-none focus-visible:ring-[3px] [a]:transition-colors",
		variants: {
			variant: {
				default: "border-transparent",
				outline: "border-border",
				muted: "bg-muted/50 border-transparent"
			},
			size: {
				default: "gap-2.5 px-3 py-2.5",
				sm: "gap-2.5 px-3 py-2.5",
				xs: "gap-2 px-2.5 py-2 in-data-[slot=dropdown-menu-content]:p-0"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default"
		}
	});

	export type RootSizes = VariantProps<typeof rootVariants>["size"];
	export type RootVariants = VariantProps<typeof rootVariants>["variant"];

	export type RootProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
		variant?: RootVariants;
		size?: RootSizes;
	};
</script>

<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), class: className, child, variant, size, ...restProps }: RootProps = $props();

	const mergedProps = $derived({
		class: cn(rootVariants({ variant, size }), className),
		"data-slot": "item",
		"data-variant": variant,
		"data-size": size,
		...restProps
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div bind:this={ref} {...mergedProps}>
		{@render mergedProps.children?.()}
	</div>
{/if}
