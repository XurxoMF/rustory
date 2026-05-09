<script lang="ts" module>
	export type ContentPageData = { vsInstance: VSInstance };

	export type ContentProps = PageProps & {
		pageData: ContentPageData;
	};
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { untrack } from "svelte";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconPencil from "@tabler/icons-svelte/icons/pencil";
	import IconTrash from "@tabler/icons-svelte/icons/trash";

	import { type VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Button from "$lib/components/ui/button";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	import DeleteVSInstanceDialog from "$lib/components/vs-instances/delete-dialog.svelte";

	let { pageData }: ContentProps = $props();

	const staticPageData = untrack(() => pageData);

	const vsInstance = staticPageData.vsInstance;

	let deleteDialogOpen: boolean = $state(false);
</script>

<Tabs.Root value="info">
	<Tabs.List class="w-full" variant="default">
		<Tabs.Trigger value="info">Info</Tabs.Trigger>
		<Tabs.Trigger value="mods">Mods</Tabs.Trigger>
		<Tabs.Trigger value="backups">Backups</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="info">
		<Typo.P>{vsInstance.name} info</Typo.P>
	</Tabs.Content>

	<Tabs.Content value="mods">
		<Typo.P>{vsInstance.name} mods</Typo.P>

		{#each vsInstance.mods as mod (mod.modid)}
			<Typo.P>{mod.name} · {mod.version}</Typo.P>
		{/each}
	</Tabs.Content>

	<Tabs.Content value="backups">
		<Typo.P>{vsInstance.name} backups</Typo.P>
	</Tabs.Content>
</Tabs.Root>

<DeleteVSInstanceDialog bind:open={deleteDialogOpen} onSuccess={() => goto(resolve("/vs-instances"))} {vsInstance} />

<FloatingMenu.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button.Root {...props} variant="outline" size="icon" onclick={() => goto(resolve("/vs-instances/[slug]/edit", { slug: vsInstance.id }))}>
					<IconPencil />
					<span class="sr-only">Edit this Vintage Story Instance</span>
				</Button.Root>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Content>
			<p>Edit this Vintage Story Instance</p>
		</Tooltip.Content>
	</Tooltip.Root>

	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button.Root {...props} variant="destructive" size="icon" onclick={() => (deleteDialogOpen = true)}>
					<IconTrash />
					<span class="sr-only">Delete this Vintage Story Instance</span>
				</Button.Root>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Content>
			<p>Delete this Vintage Story Instance</p>
		</Tooltip.Content>
	</Tooltip.Root>
</FloatingMenu.Root>
