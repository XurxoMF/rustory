<script lang="ts">
	import { ModeWatcher } from "mode-watcher";

	import { page } from "$app/state";

	import "./layout.css";

	import * as Sidebar from "$lib/components/ui/sidebar";

	import AppHeader from "./app-header.svelte";
	import AppSidebar from "./app-sidebar.svelte";

	import { locales, localizeHref } from "$lib/paraglide/runtime";

	let { children } = $props();
</script>

<ModeWatcher />

<div class="[--header-height:calc(--spacing(12))]">
	<Sidebar.Provider open={true} class="flex flex-col">
		<AppHeader />

		<div class="flex flex-1">
			<AppSidebar />

			<Sidebar.Inset>
				<div class="flex flex-1 flex-col gap-4 p-4">
					{@render children()}
				</div>
			</Sidebar.Inset>
		</div>
	</Sidebar.Provider>
</div>

<div style="display:none">
	{#each locales as locale (locale)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
