<script lang="ts" module>
	export const skeletonVariants = tv({
		variants: {
			size: {
				default: "h-8 w-(--skeleton-width)",
				xs: "h-6 w-(--skeleton-width) rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg",
				sm: "h-7 w-(--skeleton-width) rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
				lg: "h-9 w-(--skeleton-width)",
				icon: "size-8",
				"icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg",
				"icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
				"icon-lg": "size-9"
			}
		},
		defaultVariants: {
			size: "default"
		}
	});

	export type SkeletonSizes = VariantProps<typeof skeletonVariants>["size"];

	export type SkeletonProps = Skeleton.RootProps & {
		size?: SkeletonSizes | undefined;
	};
</script>

<script lang="ts">
	import { type VariantProps, tv } from "tailwind-variants";

	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { class: className, size = "default", ...restProps }: SkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 3) + 3}rem`;
</script>

<Skeleton.Root class={cn(skeletonVariants({ size }), className)} style="--skeleton-width: {width};" {...restProps} />
