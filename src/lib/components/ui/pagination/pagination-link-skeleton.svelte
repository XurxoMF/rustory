<script lang="ts" module>
	export type LinkSkeletonProps = Button.SkeletonProps;
</script>

<script lang="ts">
	import * as Button from "$lib/components/ui/button";

	let { ...restProps }: LinkSkeletonProps = $props();
</script>

<Button.Skeleton size="icon" {...restProps} />
