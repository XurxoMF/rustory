<script lang="ts" module>
	export const rootVariants = tv({
		base: "absolute z-20 flex items-center gap-1",
		variants: {
			position: {
				"top-left": "top-3 left-3",
				top: "top-3 left-1/2 -translate-x-1/2",
				"top-right": "top-3 right-3",
				right: "top-1/2 right-3 -translate-y-1/2",
				"bottom-right": "bottom-3 right-3",
				bottom: "bottom-3 left-1/2 -translate-x-1/2",
				"bottom-left": "bottom-3 left-3",
				left: "top-1/2 left-3 -translate-y-1/2"
			},
			direction: {
				vertical: "flex-col",
				horizontal: "flex-row"
			}
		},
		defaultVariants: {
			position: "bottom-right",
			direction: "horizontal"
		}
	});

	export type RootPositions = VariantProps<typeof rootVariants>["position"];
	export type RootDirections = VariantProps<typeof rootVariants>["direction"];

	export type RootProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		position?: RootPositions | undefined;
		direction?: RootDirections | undefined;
	};
</script>

<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), position = "bottom-right", direction = "horizontal", class: className, children, ...restProps }: RootProps = $props();
</script>

<div bind:this={ref} class={cn(rootVariants({ position, direction }), className)} {...restProps}>
	{@render children?.()}
</div>
