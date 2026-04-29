<script lang="ts">
	import type { PageProps } from "./$types";

	import { App } from "$lib/classes/App.svelte";

	import { H1, Leading, P } from "$lib/components/ui/typography";

	let { params }: PageProps = $props();

	App.breadcrumbs.segments = [
		{ label: "Vintage Story Instances", href: "/vs-instances" },
		{ label: "Manage", href: `/vs-instances/${() => params.slug}` },
		{ label: "Edit", href: `/vs-instances/${() => params.slug}/edit` }
	];
</script>

<H1>{params.slug}</H1>
<Leading>Edit this Vintage Story Instance.</Leading>

<div class="mt-6">
	<P>{params.slug}</P>
</div>
