<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";

	import IconWorld from "@tabler/icons-svelte/icons/world";
	import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
	import IconMinus from "@tabler/icons-svelte/icons/minus";
	import IconMaximize from "@tabler/icons-svelte/icons/maximize";
	import IconX from "@tabler/icons-svelte/icons/x";
	import IconArrowNarrowLeft from "@tabler/icons-svelte/icons/arrow-narrow-left";
	import IconArrowNarrowRight from "@tabler/icons-svelte/icons/arrow-narrow-right";
	import IconReload from "@tabler/icons-svelte/icons/reload";

	import { cn } from "$lib/utils";

	import { getCurrentWindow } from "@tauri-apps/api/window";

	import { Breadcrumbs } from "$lib/classes/stores/Breadcrumbs.svelte";
	import { Info } from "$lib/classes/stores/Info.svelte";
	import { Reloader } from "$lib/classes/stores/Reloader.svelte";

	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Separator from "$lib/components/ui/separator";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb";
	import * as Button from "$lib/components/ui/button";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Spinner from "$lib/components/ui/spinner";

	const appWindow = getCurrentWindow();
</script>

<header
	data-tauri-drag-region
	class="flex h-(--header-height) w-full shrink-0 flex-row items-center justify-between gap-2 px-(--header-padding-x) transition-[width,height,padding] ease-linear"
>
	<div class="flex flex-1 flex-row items-center justify-start gap-2" data-tauri-drag-region>
		<Sidebar.Trigger />

		<Separator.Root orientation="vertical" class="data-[orientation=vertical]:h-4" />

		<div class="flex flex-row items-center">
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button.Root {...props} onclick={() => history.back()} variant="ghost" size="icon-sm">
							<IconArrowNarrowLeft />
							<span class="sr-only">Go to previous page</span>
						</Button.Root>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Go to previous page</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button.Root {...props} onclick={() => history.forward()} variant="ghost" size="icon-sm">
							<IconArrowNarrowRight />
							<span class="sr-only">Go to next page</span>
						</Button.Root>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Go to next page</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button.Root {...props} onclick={() => Reloader.instance.reload()} variant="ghost" size="icon-sm">
							<IconReload />
							<span class="sr-only">Reload</span>
						</Button.Root>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Reload</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>

		<Separator.Root orientation="vertical" class=" hidden data-[orientation=vertical]:h-4 @4xl/main:block" />

		<Breadcrumb.Root class="mx-2 hidden @4xl/main:block">
			{#if Breadcrumbs.instance.segments === null}
				<p class="flex items-center gap-2 text-sm text-muted-foreground">
					<Spinner.Root />
					<span>Loading...</span>
				</p>
			{:else}
				<Breadcrumb.List>
					<Breadcrumb.Item>
						{#if page.url.pathname === "/"}
							<Breadcrumb.Page>Home</Breadcrumb.Page>
						{:else}
							<Breadcrumb.Link href={resolve("/")}>Home</Breadcrumb.Link>
						{/if}
					</Breadcrumb.Item>

					{#each Breadcrumbs.instance.segments as breadcrumb (breadcrumb.label + breadcrumb.href)}
						<Breadcrumb.Separator />

						<Breadcrumb.Item>
							{#if breadcrumb.href !== undefined}
								<Breadcrumb.Link href={breadcrumb.href}>{breadcrumb.label}</Breadcrumb.Link>
							{:else}
								<Breadcrumb.Page>{breadcrumb.label}</Breadcrumb.Page>
							{/if}
						</Breadcrumb.Item>
					{/each}
				</Breadcrumb.List>
			{/if}
		</Breadcrumb.Root>
	</div>

	<div class="flex flex-1 flex-row items-center justify-end gap-2" data-tauri-drag-region>
		<div class="flex flex-row items-center">
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button.Root {...props} variant="ghost" size="icon-sm" class={cn(Info.instance.isOnline ? "text-green-500!" : "text-destructive!")}>
							<IconWorld />
							<span class="sr-only">{Info.instance.isOnline ? "Online" : "Offline"}</span>
						</Button.Root>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>{Info.instance.isOnline ? "Online" : "Offline"}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>

		<Separator.Root orientation="vertical" class="data-[orientation=vertical]:h-4" />

		<div class="flex flex-row items-center">
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button.Root {...props} onclick={() => appWindow.hide()} variant="ghost" size="icon-sm">
							<IconChevronDown />
							<span class="sr-only">Hide app to tray</span>
						</Button.Root>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Hide app to tray</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button.Root {...props} onclick={() => appWindow.minimize()} variant="ghost" size="icon-sm">
							<IconMinus />
							<span class="sr-only">Minimize app</span>
						</Button.Root>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Minimize app</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button.Root {...props} onclick={() => appWindow.toggleMaximize()} variant="ghost" size="icon-sm">
							<IconMaximize />
							<span class="sr-only">Maximize or window app</span>
						</Button.Root>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Maximize or window app</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button.Root {...props} onclick={() => appWindow.close()} variant="ghost" size="icon-sm">
							<IconX />
							<span class="sr-only">Close app</span>
						</Button.Root>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content>
					<p>Close app</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	</div>
</header>
