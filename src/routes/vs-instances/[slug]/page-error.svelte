<script lang="ts" module>
	export type ErrorProps = PageProps & {
		err: PageLoadError;
	};
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { resolve } from "$app/paths";

	import { App } from "$lib/classes/App.svelte";

	import type { PageLoadError } from "$lib/classes/errors/PageLoadError.svelte";

	import { P } from "$lib/components/ui/typography";

	let { err }: ErrorProps = $props();

	App.breadcrumbs.segments = [{ label: "Vintage Story Instances", href: resolve("/vs-instances") }, { label: "???" }];
</script>

<P>{err.message}</P>
