<script lang="ts">
	import type { ComponentProps } from "svelte";

	import * as Sidebar from "$lib/components/ui/sidebar";

	import AppSidebarMain from "./app-sidebar-main.svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref collapsible="icon" class="top-(--header-height) h-[calc(100svh-var(--header-height))]!" {...restProps}>
	<Sidebar.Content>
		<AppSidebarMain />
	</Sidebar.Content>
</Sidebar.Root>
