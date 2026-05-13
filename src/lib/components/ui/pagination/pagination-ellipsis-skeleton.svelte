<script lang="ts" module>
	export type EllipsisSkeletonProps = Button.SkeletonProps;
</script>

<script lang="ts">
	import * as Button from "$lib/components/ui/button";

	let { ...restProps }: EllipsisSkeletonProps = $props();
</script>

<Button.Skeleton size="icon" {...restProps} />
