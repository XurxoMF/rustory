<script lang="ts">
	import { resolve } from "$app/paths";

	import IconDeviceGamepad from "@tabler/icons-svelte/icons/device-gamepad";

	import { App } from "$lib/classes/App.svelte";

	import * as Sidebar from "$lib/components/ui/sidebar";
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Vintage Story</Sidebar.GroupLabel>

	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<Sidebar.MenuButton tooltipContent="Vintage Story Instances">
				{#snippet child({ props })}
					<a href={resolve("/vs-instances")} {...props}>
						<IconDeviceGamepad />
						<span>Instances</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>

		{#each App.data.vsInstances as vsInstance (vsInstance.id)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton tooltipContent={vsInstance.name}>
					{#snippet child({ props })}
						<a href={resolve("/vs-instances/[slug]", { slug: vsInstance.id })} {...props}>
							<IconDeviceGamepad />
							<span>{vsInstance.name}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
