<script lang="ts">
	import { resolve } from "$app/paths";

	import IconDeviceGamepad from "@tabler/icons-svelte/icons/device-gamepad";
	import IconTool from "@tabler/icons-svelte/icons/tool";

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
	</Sidebar.Menu>
</Sidebar.Group>
