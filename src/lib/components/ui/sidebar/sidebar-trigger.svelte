<script lang="ts" module>
	export type TriggerProps = Button.RootProps & {
		onclick?: (e: MouseEvent) => void;
	};
</script>

<script lang="ts">
	import IconLayoutSidebar from "@tabler/icons-svelte/icons/layout-sidebar";

	import { cn } from "$lib/utils";

	import * as Button from "$lib/components/ui/button";
	import * as Tooltip from "$lib/components/ui/tooltip";

	import * as Sidebar from ".";

	let { ref = $bindable(null), class: className, onclick, ...restProps }: TriggerProps = $props();

	const sidebar = Sidebar.useSidebar();
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{#snippet child({ props })}
			<Button.Root
				{...props}
				bind:ref
				data-sidebar="trigger"
				data-slot="sidebar-trigger"
				variant="ghost"
				size="icon-sm"
				class={cn("cn-sidebar-trigger", className)}
				type="button"
				onclick={(e) => {
					onclick?.(e);
					sidebar.toggle();
				}}
				{...restProps}
			>
				<IconLayoutSidebar />
				<span class="sr-only">Toggle Sidebar</span>
			</Button.Root>
		{/snippet}
	</Tooltip.Trigger>

	<Tooltip.Content>
		<p>Toggle Sidebar</p>
	</Tooltip.Content>
</Tooltip.Root>
