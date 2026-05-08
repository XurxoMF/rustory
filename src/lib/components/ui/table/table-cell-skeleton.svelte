<script lang="ts" module>
	export type CellSkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { class: className, ...restProps }: CellSkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 50) + 40}%`;
</script>

<Skeleton.Root class={cn("h-5 w-full max-w-(--skeleton-width) rounded-full", className)} style="--skeleton-width: {width};" {...restProps} />
