<script lang="ts">
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { getCurrentWindow } from "@tauri-apps/api/window";
	import { exit as exitApp } from "@tauri-apps/plugin-process";

	import "./layout.css";

	import RustoryIcon from "$assets/icon.png";

	import { padSides, sleep } from "$lib/utils";

	import { Breadcrumbs } from "$lib/classes/stores/Breadcrumbs.svelte";
	import { Command as CommandStore } from "$lib/classes/stores/Command.svelte";
	import { Config } from "$lib/classes/stores/Config.svelte";
	import { Confirm as ConfirmStore } from "$lib/classes/stores/Confirm.svelte";
	import { Data } from "$lib/classes/stores/Data.svelte";
	import { Hotkeys } from "$lib/classes/stores/Hotkeys.svelte";
	import { Info } from "$lib/classes/stores/Info.svelte";
	import { Reloader } from "$lib/classes/stores/Reloader.svelte";
	import { Request } from "$lib/classes/stores/Request.svelte";
	import { Tray } from "$lib/classes/stores/Tray.svelte";
	import { UI } from "$lib/classes/stores/UI.svelte";
	import { Loader } from "$lib/classes/utils/Loader.svelte";
	import { Logger } from "$lib/classes/utils/Logger.svelte";

	import { locales, localizeHref } from "$lib/paraglide/runtime";

	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Toaster from "$lib/components/ui/sonner";
	import * as ScrollArea from "$lib/components/ui/scroll-area";
	import * as Confirm from "$lib/components/confirm";
	import * as Command from "$lib/components/command";

	import AppHeader from "./app-header.svelte";
	import AppSidebar from "./app-sidebar.svelte";

	let { children } = $props();
	let isInitialized = false;

	onMount(() => {
		const initialization = initializeApp();

		initialization.catch(async (err) => {
			await Logger.error(`There was an error initializing the app: ${err}`);
			await exitApp(1);
		});
	});

	async function initializeApp(): Promise<void> {
		if (isInitialized) return;

		await Logger.info("Initializing app...");
		await Logger.info("Forwarding console logs to the logger...");

		forwardConsole("log", Logger.trace);
		forwardConsole("debug", Logger.debug);
		forwardConsole("info", Logger.info);
		forwardConsole("warn", Logger.warn);
		forwardConsole("error", Logger.error);

		const appWindow = getCurrentWindow();

		await Logger.info("Initializing basic modules...");
		await Info.init();
		await Config.init();
		await Tray.init();

		await Logger.info("Showing window...");
		await appWindow.show();

		await Logger.info("Initializing UI and data modules...");
		await CommandStore.init();
		await Hotkeys.init();
		await Breadcrumbs.init();
		await Reloader.init();
		await Request.init();
		await ConfirmStore.init();
		await Data.init();

		await logWelcome();

		Loader.instance.loadApp = true;
		await sleep(500);
		Loader.instance.showLoader = false;
		isInitialized = true;
	}

	function forwardConsole(
		fnName: "log" | "debug" | "info" | "warn" | "error",
		logger: (message: string, args?: { file: string; line: number } | undefined) => Promise<void>
	): void {
		const original = console[fnName];

		console[fnName] = (message) => {
			original(message);
			void logger(String(message));
		};
	}

	async function logWelcome(): Promise<void> {
		const width = 110;
		const separator = `+${"-".repeat(width + 2)}+`;
		const version = `Version: v${Info.instance.version}`;
		const osInfo = `OS Type: ${Info.instance.osType} · OS Version: ${Info.instance.osVersion} · OS Arch: ${Info.instance.osArch}`;
		const netSdksInfo = `.NET SDKs: ${Info.instance.netSdks.join(", ")}`;
		const netRuntimes = `.NET Runtimes: ${Info.instance.netRuntimes.join(", ")}`;

		await Logger.info("");
		await Logger.info("");
		await Logger.info(separator);
		await Logger.info(`| ${padSides("    ____  __  _________________  ______  __", width)} |`);
		await Logger.info(
			`| ${padSides("   / __ \\/ / / / ___/_  __/ __ \\/ __ \\ \\/ /    Made with love by XurxoMF and all the contributors! ❤️", width)} |`
		);
		await Logger.info(`| ${padSides("  / /_/ / / / /\\__ \\ / / / / / / /_/ /\\  /     Copyright © 2025 - Today · XurxoMF", width)} |`);
		await Logger.info(`| ${padSides(` / _, _/ /_/ /___/ // / / /_/ / _, _/ / /      ${version}`, width)} |`);
		await Logger.info(`| ${padSides("/_/ |_|\\____//____//_/  \\____/_/ |_| /_/", width)} |`);
		await Logger.info(separator);
		await Logger.info(`| ${padSides(osInfo, width)} |`);
		await Logger.info(separator);
		await Logger.info(`| ${padSides(netSdksInfo, width)} |`);
		await Logger.info(`| ${padSides(netRuntimes, width)} |`);
		await Logger.info(separator);
		await Logger.info("");
		await Logger.info("");
	}
</script>

<!-- Show the loader while configs, data and other things are loading. -->
{#if Loader.instance.showLoader}
	<div
		class="absolute top-0 right-0 bottom-0 left-0 z-1000 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-background"
		out:fade={{ duration: 150, delay: 200 }}
	>
		<img src={RustoryIcon} alt="Rustory" class="h-36 w-36" />
	</div>
{/if}

<!-- Load the app when the configs, data dn other things are loaded. -->
{#if Loader.instance.loadApp}
	<Tooltip.Provider delayDuration={500}>
		<Command.Root />

		<Confirm.Root />

		<Toaster.Root position="top-right" closeButton richColors visibleToasts={10} duration={10_000} />

		<Sidebar.Provider open={true}>
			<AppSidebar />

			<Sidebar.Inset
				class="[--header-height:calc(--spacing(16))] [--header-padding-x:calc(--spacing(4))] group-has-data-[collapsible=icon]/sidebar-wrapper:[--header-height:calc(--spacing(12))] group-has-data-[collapsible=icon]/sidebar-wrapper:[--header-padding-x:calc(--spacing(2))]"
			>
				<AppHeader />

				<ScrollArea.Root bind:viewportRef={UI.instance.contentRef} class="h-[calc(100%-var(--header-height))] w-full">
					<div class="flex min-h-full w-full flex-col gap-4 p-4">
						{@render children()}
					</div>
				</ScrollArea.Root>
			</Sidebar.Inset>
		</Sidebar.Provider>
	</Tooltip.Provider>
{/if}

<div style="display:none">
	{#each locales as locale (locale)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
