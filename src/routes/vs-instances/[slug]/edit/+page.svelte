<script lang="ts">
	import type { PageProps } from "./$types";

	import { untrack } from "svelte";

	import { App } from "$lib/classes/App.svelte";

	import { H1, Leading, P } from "$lib/components/ui/typography";

	let { data }: PageProps = $props();

	const instance = untrack(() => data.instance);

	App.breadcrumbs.segments = [
		{ label: "Vintage Story Instances", href: "/vs-instances" },
		{ label: `${instance.name}`, href: `/vs-instances/${() => instance.id}` },
		{ label: "Edit", href: `/vs-instances/${() => instance.id}/edit` }
	];
</script>

<H1>Edit {instance.name}</H1>
<Leading>Edit this Vintage Story Instance.</Leading>

<div class="mt-6">
	<P>Editing {instance.name}</P>
</div>
