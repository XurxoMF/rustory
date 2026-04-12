<script lang="ts">
	import type { ComponentProps } from "svelte";

	import RustoryIcon from "$assets/icon.png";

	import { App } from "$lib/classes/App.svelte";

	import * as Sidebar from "$lib/components/ui/sidebar";

	import AppSidebarMain from "./app-sidebar-main.svelte";
	import AppSidebarSecondary from "./app-sidebar-secondary.svelte";
	import { resolve } from "$app/paths";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref collapsible="icon" variant="sidebar" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href={resolve("/")} {...props}>
							<div class="flex aspect-square size-8 items-center justify-center rounded-lg">
								<img src={RustoryIcon} alt={App.info.capitalizedName} />
							</div>

							<div class="flex flex-col truncate font-medium">
								<span>{App.info.capitalizedName}</span>
								<span class="text-xs text-muted-foreground">v{App.info.version}</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<AppSidebarMain />

		<AppSidebarSecondary />
	</Sidebar.Content>
</Sidebar.Root>
