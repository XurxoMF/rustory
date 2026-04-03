<script lang="ts">
	import { toggleMode } from "mode-watcher";
	import { resolve } from "$app/paths";
	import { getCurrentWindow } from "@tauri-apps/api/window";

	import { IconSun, IconMoon, IconX, IconMinus, IconMaximize } from "@tabler/icons-svelte";

	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Separator from "$lib/components/ui/separator";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	import * as Button from "$lib/components/ui/button";

	const appWindow = getCurrentWindow();
</script>

<header class="sticky top-0 z-50 flex h-(--header-height) w-full flex-row items-center justify-between gap-2 border-b bg-background px-2">
	<div class="flex flex-1 flex-row items-center justify-start gap-2">
		<Sidebar.Trigger />

		<Separator.Root orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />

		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item class="hidden md:block">
					<Breadcrumb.Link href={resolve("/")}>Home</Breadcrumb.Link>
				</Breadcrumb.Item>

				<Breadcrumb.Separator class="hidden md:block" />

				<Breadcrumb.Item>
					<Breadcrumb.Page>This page</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>

	<div class="flex flex-1 flex-row items-center justify-center">
		<p>Rustory</p>
	</div>

	<div class="flex flex-1 flex-row items-center justify-end gap-2">
		<div class="flex flex-row items-center">
			<Button.Root onclick={toggleMode} variant="ghost" size="icon-sm">
				<IconSun class="scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
				<IconMoon class="absolute scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
				<span class="sr-only">Toggle theme</span>
			</Button.Root>
		</div>

		<Separator.Root orientation="vertical" class="data-[orientation=vertical]:h-4" />

		<div class="flex flex-row items-center">
			<Button.Root onclick={() => appWindow.hide()} variant="ghost" size="icon-sm">
				<IconMinus />
				<span class="sr-only">Minimize app to tray</span>
			</Button.Root>

			<Button.Root onclick={() => appWindow.toggleMaximize()} variant="ghost" size="icon-sm">
				<IconMaximize />
				<span class="sr-only">Maximize or minimize app</span>
			</Button.Root>

			<Button.Root onclick={() => appWindow.close()} variant="ghost" size="icon-sm">
				<IconX />
				<span class="sr-only">Close app</span>
			</Button.Root>
		</div>
	</div>
</header>
