<script lang="ts">
	import { resolve } from "$app/paths";

	import IconDeviceGamepad from "@tabler/icons-svelte/icons/device-gamepad";
	import IconTool from "@tabler/icons-svelte/icons/tool";

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

		<Sidebar.MenuItem>
			<Sidebar.MenuButton tooltipContent="Vintage Story Mods">
				{#snippet child({ props })}
					<a href={resolve("/vs-mods")} {...props}>
						<IconTool />
						<span>Mods</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>

		{#each App.data.vsInstances as vsInstance (vsInstance.id)}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton tooltipContent={vsInstance.name}>
					{#snippet child({ props })}
						<a href={resolve("/vs-instances/[slug]/edit", { slug: vsInstance.id })} {...props}>
							<IconTool />
							<span>{vsInstance.name}</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}

		<Sidebar.MenuItem>
			<Sidebar.MenuButton tooltipContent="Incorrect Vintage Story Instance">
				{#snippet child({ props })}
					<a href={resolve("/vs-instances/[slug]/edit", { slug: "1234" })} {...props}>
						<IconTool />
						<span>Incorrect VS Instance</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
</Sidebar.Group>
