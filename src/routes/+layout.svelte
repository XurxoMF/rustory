<script lang="ts">
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import { trace, info, warn, error, debug } from "@tauri-apps/plugin-log";

	// Save the original console log methods
	const original = {
		log: console.log,
		warn: console.warn,
		error: console.error,
		trace: console.trace,
		debug: console.debug
	};

	// Override the console log methods to log to both the log files and the web console
	console.log = (...args) => {
		original.log(...args);
		info(`[WEB CONSOLE] ${args.join(" | ")}`);
	};
	console.warn = (...args) => {
		original.warn(...args);
		warn(`[WEB CONSOLE] ${args.join(" | ")}`);
	};
	console.error = (...args) => {
		original.error(...args);
		error(`[WEB CONSOLE] ${args.join(" | ")}`);
	};
	console.trace = (...args) => {
		original.trace(...args);
		trace(`[WEB CONSOLE] ${args.join(" | ")}`);
	};
	console.debug = (...args) => {
		original.debug(...args);
		debug(`[WEB CONSOLE] ${args.join(" | ")}`);
	};

	import "./layout.css";

	import RustoryIcon from "$assets/icon.png";

	import { sleep } from "$lib/utils";

	import { Info } from "$lib/classes/Info.svelte";
	import { Config } from "$lib/classes/Config.svelte";
	import { MainWindow } from "$lib/classes/MainWindow.svelte";
	import { Hotkeys } from "$lib/classes/Hotkeys.svelte";
	import { Data } from "$lib/classes/Data.svelte";

	import { locales, localizeHref } from "$lib/paraglide/runtime";

	import * as Sidebar from "$lib/components/ui/sidebar";
	import { Toaster } from "$lib/components/ui/sonner";

	import AppHeader from "./app-header.svelte";
	import AppSidebar from "./app-sidebar.svelte";

	let { children } = $props();

	let showLoader = $state(true);
	let loadApp = $state(false);

	const currentWindow = getCurrentWindow();

	// Load all the data ince the loader is mounted.
	onMount(async () => {
		showLoader = true;

		// Load the info, config, window state and tasks.
		await Info.init();
		await Config.init();
		await MainWindow.init();

		// Show the window and wait a few ms for it to load.
		await currentWindow.show();
		await sleep(500);

		// Load the hotkeys.
		await Hotkeys.init();

		// Load data like Versions, Instances...
		await Data.init();

		// Here will be added the future tasks like Instance and Server loading, app updating, check mod updates...

		// Start preloading the UI on the background, wait a few ms for it to load and then complete the last task.
		loadApp = true;
		await sleep(500);
		showLoader = false;
	});
</script>

<!-- Show the loader while configs, data and other things are loading. -->
{#if showLoader}
	<div
		class="absolute top-0 right-0 bottom-0 left-0 z-1000 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-background"
		out:fade={{ duration: 150, delay: 200 }}
	>
		<img src={RustoryIcon} alt="Rustory" class="h-36 w-36" />
	</div>
{/if}

<!-- Load the app when the configs, data dn other things are loaded. -->
{#if loadApp}
	<Toaster />

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
{/if}

<div style="display:none">
	{#each locales as locale (locale)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
