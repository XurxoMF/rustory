<script lang="ts">
	import { resolve } from "$app/paths";

	import IconDeviceGamepad from "@tabler/icons-svelte/icons/device-gamepad";

	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Collapsible from "$lib/components/ui/collapsible";
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Vintage Story</Sidebar.GroupLabel>

	<Sidebar.Menu>
		<Collapsible.Root>
			{#snippet child({ props })}
				<Sidebar.MenuItem {...props}>
					<Sidebar.MenuButton tooltipContent="Vintage Story Instances">
						{#snippet child({ props })}
							<a href={resolve("/vs-instances")} {...props}>
								<IconDeviceGamepad />
								<span>Instances</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/snippet}
		</Collapsible.Root>
	</Sidebar.Menu>
</Sidebar.Group>
