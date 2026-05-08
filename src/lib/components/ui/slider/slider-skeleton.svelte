<script lang="ts" module>
	export type SkeletonProps = Skeleton.RootProps & {
		orientation?: "horizontal" | "vertical";
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { ref = $bindable(null), class: className, orientation = "horizontal", ...restProps }: SkeletonProps = $props();
</script>

<Skeleton.Root
	data-orientation={orientation}
	class={cn("rounded-full data-horizontal:h-3 data-horizontal:w-full data-vertical:h-full data-vertical:min-h-40 data-vertical:w-3", className)}
	{ref}
	{...restProps}
/>
