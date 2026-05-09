<script lang="ts" module>
	export type SkeletonProps = PageProps;
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { App } from "$lib/classes/App.svelte";

	import * as Typo from "$lib/components/ui/typography";

	let _: SkeletonProps = $props();

	App.breadcrumbs.segments = null;
</script>

<Typo.P>Skeleton!</Typo.P>
