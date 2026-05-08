<script lang="ts" module>
	export type CaptionSkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { class: className, ...restProps }: CaptionSkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 50) + 40}%`;
</script>

<Skeleton.Root class={cn("h-4.5 w-full max-w-(--skeleton-width) rounded-full", className)} style="--skeleton-width: {width};" {...restProps} />
