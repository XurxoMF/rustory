<script lang="ts" module>
	export const skeletonVariants = tv({
		base: "absolute z-20 flex items-center gap-1 rounded-lg bg-card p-1 shadow-xl",
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
			}
		},
		defaultVariants: {
			position: "bottom-right"
		}
	});

	export type SkeletonPositions = VariantProps<typeof skeletonVariants>["position"];

	export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
		position?: SkeletonPositions | undefined;
	};
</script>

<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	import { cn } from "$lib/utils";

	let { position = "bottom-right", class: className, children, ...restProps }: SkeletonProps = $props();
</script>

<div class={cn(skeletonVariants({ position }), className)} {...restProps}>
	{@render children?.()}
</div>
