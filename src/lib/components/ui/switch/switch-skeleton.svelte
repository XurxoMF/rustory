<script lang="ts" module>
	export type SkeletonProps = Skeleton.RootProps & {
		size?: "sm" | "default" | undefined;
	};
</script>

<script lang="ts">
	import { cn } from "$lib/utils";

	import * as Skeleton from "$lib/components/ui/skeleton";

	let { ref = $bindable(null), class: className, size = "default", ...restProps }: SkeletonProps = $props();
</script>

<Skeleton.Root
	class={cn("shrink-0 rounded-full data-[size=default]:h-[18.4px] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6", className)}
	data-size={size}
	{ref}
	{...restProps}
/>
