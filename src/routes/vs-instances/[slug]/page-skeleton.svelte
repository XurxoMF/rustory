<script lang="ts" module>
	export type SkeletonProps = PageProps;
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { App } from "$lib/classes/App.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Button from "$lib/components/ui/button";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	let _: SkeletonProps = $props();

	App.breadcrumbs.segments = null;
</script>

<Typo.H1><Typo.H1Skeleton /></Typo.H1>
<Typo.Leading><Typo.LeadingSkeleton /></Typo.Leading>

<Tabs.Root>
	<Tabs.ListSkeleton class="w-full">
		<Tabs.TriggerSkeleton />
		<Tabs.TriggerSkeleton />
		<Tabs.TriggerSkeleton />
	</Tabs.ListSkeleton>

	<Tabs.Content value="">
		<Typo.P><Typo.PSkeleton /></Typo.P>
	</Tabs.Content>
</Tabs.Root>

<FloatingMenu.Skeleton>
	<Button.Skeleton size="icon" />
	<Button.Skeleton size="icon" />
</FloatingMenu.Skeleton>
