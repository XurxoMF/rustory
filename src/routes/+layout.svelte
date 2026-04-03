<script lang="ts">
	import { ModeWatcher, toggleMode } from 'mode-watcher';

	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	import SunIcon from '@tabler/icons-svelte/icons/sun';
	import MoonIcon from '@tabler/icons-svelte/icons/moon';

	import './layout.css';

	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Separator from '$lib/components/ui/separator';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as Button from '$lib/components/ui/button';

	import AppSidebar from '$lib/components/app-sidebar.svelte';

	import { locales, localizeHref } from '$lib/paraglide/runtime';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" />

<Sidebar.Provider open={true}>
	<AppSidebar />

	<Sidebar.Inset>
		<header class="flex shrink-0 flex-row items-center justify-between gap-2 p-2">
			<div class="flex items-center gap-2">
				<Sidebar.Trigger />

				<Separator.Root orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />

				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href={resolve('/')}>/</Breadcrumb.Link>
						</Breadcrumb.Item>

						<Breadcrumb.Separator class="hidden md:block" />

						<Breadcrumb.Item>
							<Breadcrumb.Page>Another Page</Breadcrumb.Page>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>

			<div class="flex items-center gap-2">
				<Button.Root onclick={toggleMode} variant="ghost" size="icon-sm">
					<SunIcon class="scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
					<MoonIcon
						class="absolute scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button.Root>
			</div>
		</header>

		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>

<div style="display:none">
	{#each locales as locale (locale)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
	{/each}
</div>
