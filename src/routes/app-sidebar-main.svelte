<script lang="ts">
	import { resolve } from "$app/paths";

	import IconDeviceGamepad from "@tabler/icons-svelte/icons/device-gamepad";
	import IconPlus from "@tabler/icons-svelte/icons/plus";

	import * as Sidebar from "$lib/components/ui/sidebar";
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>VS Instances</Sidebar.GroupLabel>

	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<Sidebar.MenuButton>
				{#snippet child({ props })}
					<a href={resolve("/vs-instances")} {...props}>
						<IconDeviceGamepad />
						<span>Manage</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>

		<Sidebar.MenuItem>
			<Sidebar.MenuButton>
				{#snippet child({ props })}
					<a href={resolve("/vs-instances/create")} {...props}>
						<IconPlus />
						<span>Create</span>
					</a>
				{/snippet}
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
</Sidebar.Group>
