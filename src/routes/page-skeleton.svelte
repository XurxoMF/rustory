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

<Typo.H1>Welcome to Rustory!</Typo.H1>
<Typo.Leading>Your daily source of Vintage Story!</Typo.Leading>

<Typo.P>Skeleton!</Typo.P>
