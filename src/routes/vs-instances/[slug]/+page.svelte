<script lang="ts">
	import type { PageProps } from "./$types";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconPencil from "@tabler/icons-svelte/icons/pencil";

	import { App } from "$lib/classes/App.svelte";

	import { H1, Leading, P } from "$lib/components/ui/typography";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { Button } from "$lib/components/ui/button";

	let { params }: PageProps = $props();

	App.breadcrumbs.segments = [
		{ label: "Vintage Story Instances", href: "/vs-instances" },
		{ label: "Manage", href: `/vs-instances/${() => params.slug}` }
	];
</script>

<div class="absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl">
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="icon" onclick={() => goto(resolve("/vs-instances/[slug]/edit", { slug: params.slug }))}>
					<IconPencil />
					<span class="sr-only">Edit this Vintage Story Instance</span>
				</Button>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Content>
			<p>Edit this Vintage Story Instance</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>

<H1>{params.slug}</H1>
<Leading>Manage this Vintage Story Instance.</Leading>

<div class="mt-6">
	<P>{params.slug}</P>
</div>
