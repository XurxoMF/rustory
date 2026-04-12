<script lang="ts">
	import { resolve } from "$app/paths";
	import { openUrl } from "@tauri-apps/plugin-opener";

	import IconHeart from "@tabler/icons-svelte/icons/heart";
	import IconSettings from "@tabler/icons-svelte/icons/settings";
	import IconSearch from "@tabler/icons-svelte/icons/search";

	import { App } from "$lib/classes/App.svelte";

	import * as Sidebar from "$lib/components/ui/sidebar";
</script>

<Sidebar.Group class="mt-auto">
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="sm" onclick={() => openUrl("https://ko-fi.com/xurxomf")}>
					<IconHeart class="text-pink-500" />
					<span>Support</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>

			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="sm" onclick={() => (App.command.open = true)}>
					<IconSearch />
					<span>Search</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>

			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="sm">
					{#snippet child({ props })}
						<a href={resolve("/settings")} {...props}>
							<IconSettings />
							<span>Settings</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
