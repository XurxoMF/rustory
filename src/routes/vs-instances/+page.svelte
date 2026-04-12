<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	App.breadcrumbs.segments = [{ label: "VS Instances", href: "/vs-instances" }];
</script>

<!-- List of Vintage Story Instances -->
{#each App.data.vsInstances as vsInstance (vsInstance.id)}
	<div>
		<p>{vsInstance.name}</p>
	</div>
{/each}
