<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	import "./layout.css";

	import RustoryIcon from "$assets/icon.png";

	import IconSun from "@tabler/icons-svelte/icons/sun";
	import IconMoon from "@tabler/icons-svelte/icons/moon";
	import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
	import IconMinus from "@tabler/icons-svelte/icons/minus";
	import IconMaximize from "@tabler/icons-svelte/icons/maximize";
	import IconX from "@tabler/icons-svelte/icons/x";

	import { App } from "$lib/classes/App.svelte";

	import { locales, localizeHref } from "$lib/paraglide/runtime";

	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Separator from "$lib/components/ui/separator";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	import * as Button from "$lib/components/ui/button";
	import * as Toaster from "$lib/components/ui/sonner";
	import * as ScrollArea from "$lib/components/ui/scroll-area";
	import * as Confirm from "$lib/components/confirm";
	import * as Command from "$lib/components/command";

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
			<header
				data-tauri-drag-region
				class="flex h-(--header-height) w-full shrink-0 flex-row items-center justify-between gap-2 px-(--header-padding-x) transition-[width,height,padding] ease-linear"
			>
				<div class="flex flex-1 flex-row items-center justify-start gap-2">
					<Sidebar.Trigger />

					<Separator.Root orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />

					<Breadcrumb.Root class="hidden md:block">
						<Breadcrumb.List>
							<Breadcrumb.Item>
								<Breadcrumb.Link href={resolve("/")}>Home</Breadcrumb.Link>
							</Breadcrumb.Item>

							{#each App.breadcrumbs.segments as breadcrumb (breadcrumb.href)}
								<Breadcrumb.Separator />

								<Breadcrumb.Item>
									<Breadcrumb.Link href={breadcrumb.href}>{breadcrumb.label}</Breadcrumb.Link>
								</Breadcrumb.Item>
							{/each}
						</Breadcrumb.List>
					</Breadcrumb.Root>
				</div>

				<div class="flex flex-1 flex-row items-center justify-center">
					<p>Rustory</p>
				</div>

				<div class="flex flex-1 flex-row items-center justify-end gap-2">
					<div class="flex flex-row items-center">
						<Button.Root onclick={() => App.config.setTheme(App.config.theme === "dark" ? "light" : "dark")} variant="ghost" size="icon-sm">
							<IconSun class="scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
							<IconMoon class="absolute scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
							<span class="sr-only">Toggle theme</span>
						</Button.Root>
					</div>

					<Separator.Root orientation="vertical" class="data-[orientation=vertical]:h-4" />

					<div class="flex flex-row items-center">
						<Button.Root onclick={() => App.window.hide()} variant="ghost" size="icon-sm">
							<IconChevronDown />
							<span class="sr-only">Minimize app</span>
						</Button.Root>

						<Button.Root onclick={() => App.window.minimize()} variant="ghost" size="icon-sm">
							<IconMinus />
							<span class="sr-only">Minimize app</span>
						</Button.Root>

						<Button.Root onclick={() => App.window.toggleMaximize()} variant="ghost" size="icon-sm">
							<IconMaximize />
							<span class="sr-only">Maximize or window app</span>
						</Button.Root>

						<Button.Root onclick={() => App.window.close()} variant="ghost" size="icon-sm">
							<IconX />
							<span class="sr-only">Close app</span>
						</Button.Root>
					</div>
				</div>
			</header>

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
