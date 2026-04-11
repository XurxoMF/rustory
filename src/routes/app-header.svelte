<script lang="ts">
	import { resolve } from "$app/paths";

	import IconSearch from "@tabler/icons-svelte/icons/search";
	import IconSun from "@tabler/icons-svelte/icons/sun";
	import IconMoon from "@tabler/icons-svelte/icons/moon";
	import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
	import IconMinus from "@tabler/icons-svelte/icons/minus";
	import IconMaximize from "@tabler/icons-svelte/icons/maximize";
	import IconX from "@tabler/icons-svelte/icons/x";

	import { App } from "$lib/classes/App.svelte";

	import * as Separator from "$lib/components/ui/separator";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	import * as Button from "$lib/components/ui/button";
	import * as Sidebar from "$lib/components/ui/sidebar";
</script>

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

	<div class="flex flex-1 flex-row items-center justify-end gap-2">
		<div class="flex flex-row items-center">
			<Button.Root onclick={() => App.config.setTheme(App.config.theme === "dark" ? "light" : "dark")} variant="ghost" size="icon-sm">
				<IconSun class="scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
				<IconMoon class="absolute scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
				<span class="sr-only">Toggle theme</span>
			</Button.Root>

			<Button.Root onclick={() => (App.command.open = true)} variant="ghost" size="icon-sm">
				<IconSearch />
				<span class="sr-only">Search</span>
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
