<script lang="ts" module>
	export type SkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { class: className, ...restProps }: SkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 3) + 3}rem`;
</script>

<Skeleton.Root class={cn("h-5 w-(--skeleton-width) rounded-full", className)} style="--skeleton-width: {width};" {...restProps} />
