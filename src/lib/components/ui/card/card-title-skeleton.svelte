<script lang="ts" module>
	export type TitleSkeletonProps = Skeleton.RootProps;
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { class: className, ...restProps }: TitleSkeletonProps = $props();

	let width = `${Math.floor(Math.random() * 50) + 40}%`;
</script>

<Skeleton.Root class={cn("h-6.5 max-w-(--skeleton-width) flex-1 rounded-full", className)} style="--skeleton-width: {width};" {...restProps} />
