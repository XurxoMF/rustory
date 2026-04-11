<script lang="ts">
	import { page } from "$app/state";

	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	import "./layout.css";

	import RustoryIcon from "$assets/icon.png";

	import { App } from "$lib/classes/App.svelte";

	import { locales, localizeHref } from "$lib/paraglide/runtime";

	import * as Sidebar from "$lib/components/ui/sidebar";

	import * as Toaster from "$lib/components/ui/sonner";
	import * as ScrollArea from "$lib/components/ui/scroll-area";
	import * as Confirm from "$lib/components/confirm";
	import * as Command from "$lib/components/command";

	import AppHeader from "./app-header.svelte";
	import AppSidebar from "./app-sidebar.svelte";

	let { children } = $props();

	onMount(() => {
		// Initialize the app.
		App.init();
	});
</script>

<!-- Show the loader while configs, data and other things are loading. -->
{#if App.loader.showLoader}
	<div
		class="absolute top-0 right-0 bottom-0 left-0 z-1000 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-background"
		out:fade={{ duration: 150, delay: 200 }}
	>
		<img src={RustoryIcon} alt="Rustory" class="h-36 w-36" />
	</div>
{/if}

<!-- Load the app when the configs, data dn other things are loaded. -->
{#if App.loader.loadApp}
	<Command.Root />

	<Confirm.Root />

	<Toaster.Root />

	<Sidebar.Provider open={true}>
		<AppSidebar />

		<Sidebar.Inset
			class="[--header-height:calc(--spacing(16))] [--header-padding-x:calc(--spacing(4))] group-has-data-[collapsible=icon]/sidebar-wrapper:[--header-height:calc(--spacing(12))] group-has-data-[collapsible=icon]/sidebar-wrapper:[--header-padding-x:calc(--spacing(2))]"
		>
			<AppHeader />

			<ScrollArea.ScrollArea class="h-[calc(100%-var(--header-height))] w-full">
				<div class="flex flex-col gap-4 p-4">
					{@render children()}
				</div>
			</ScrollArea.ScrollArea>
		</Sidebar.Inset>
	</Sidebar.Provider>
{/if}

<div style="display:none">
	{#each locales as locale (locale)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
