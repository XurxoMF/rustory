<script lang="ts" module>
	export const groupVariants = tv({
		base: "flex gap-1 p-1 items-center rounded-xl bg-popover/90 shadow shadow-background",
		variants: {
			direction: {
				vertical: "flex-col",
				horizontal: "flex-row"
			}
		},
		defaultVariants: {
			direction: "horizontal"
		}
	});

	export type GroupDirections = VariantProps<typeof groupVariants>["direction"];

	export type GroupProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		direction?: GroupDirections | undefined;
	};
</script>

<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";

	import { cn, type WithElementRef } from "$lib/utils";

	let { ref = $bindable(null), direction = "horizontal", class: className, children, ...restProps }: GroupProps = $props();
</script>

<div bind:this={ref} class={cn(groupVariants({ direction }), className)} {...restProps}>
	{@render children?.()}
</div>
