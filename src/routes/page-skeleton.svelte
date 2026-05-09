<script lang="ts" module>
	export type SkeletonProps = PageProps;
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import * as Typo from "$lib/components/ui/typography";

	let _: SkeletonProps = $props();
</script>

<Typo.P>Skeleton!</Typo.P>
