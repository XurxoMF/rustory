<script lang="ts" module>
	export type ContentPageData = null;

	export type ContentProps = PageProps & {
		pageData: ContentPageData;
	};
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { App } from "$lib/classes/App.svelte";

	import * as Typo from "$lib/components/ui/typography";

	let { pageData: _ }: ContentProps = $props();

	App.breadcrumbs.segments = [];
</script>

<Typo.P>
	The app is still on early development and it's not really usable yet! If you're seeing this then you are probably a developer, tester or translator,
	if that's the case, hiiiI!
</Typo.P>

<Typo.P>
	I'm trying my best to finish the app as soon as possible while keeping it easy to use, bug free, developer friendly, optimized and... a lot of other
	cool things!
</Typo.P>

<Typo.P>If you have any suggestion feel free to share it here!</Typo.P>
