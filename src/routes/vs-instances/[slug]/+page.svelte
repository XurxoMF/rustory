<script lang="ts">
	import type { PageProps } from "./$types";

	import { App } from "$lib/classes/App.svelte";

	import { H1, Leading } from "$lib/components/ui/typography";

	let { params }: PageProps = $props();

	App.breadcrumbs.segments = [
		{ label: "Vintage Story Instances", href: "/vs-instances" },
		{ label: "Manage", href: `/vs-instances/${() => params.slug}` }
	];
</script>

<H1>{params.slug}</H1>
<Leading>Manage this Vintage Story Instance.</Leading>

<div class="mt-6">
	<p>{params.slug}</p>
</div>
