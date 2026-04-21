<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import { H1, Leading } from "$lib/components/ui/typography";
	import { Button } from "$lib/components/ui/button";

	App.breadcrumbs.segments = [{ label: "VS Instances", href: "/vs-instances" }];
</script>

<H1>Vintage Story Instances</H1>
<Leading>View and manage your Vintage Story Instances.</Leading>

<div class="mt-6">
	<!-- List of Vintage Story Instances -->
	{#each App.data.vsInstances as vsInstance (vsInstance.id)}
		<div class="flex gap-4">
			<p>{vsInstance.name}</p>
			<p>{vsInstance.version}</p>
			<p>{vsInstance.state}</p>
			<Button variant="destructive" onclick={() => App.data.setVsInstances(App.data.vsInstances.filter((i) => i.id !== vsInstance.id))}>
				Delete {vsInstance.name}
			</Button>
		</div>
	{/each}
</div>
