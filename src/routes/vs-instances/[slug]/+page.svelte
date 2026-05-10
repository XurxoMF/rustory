<script lang="ts">
	import { type PageProps } from "./$types";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconPencil from "@tabler/icons-svelte/icons/pencil";
	import IconTrash from "@tabler/icons-svelte/icons/trash";

	import { App } from "$lib/classes/App.svelte";

	import { type VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Button from "$lib/components/ui/button";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	import DeleteVSInstanceDialog from "$lib/components/vs-instances/delete-dialog.svelte";

	let { params }: PageProps = $props();

	const vsInstance: VSInstance | undefined = $derived(App.data.vsInstances.find((i) => i.id === params.slug));

	$effect(() => {
		if (vsInstance !== undefined) {
			App.breadcrumbs.segments = [{ label: "Vintage Story Instances", href: resolve("/vs-instances") }, { label: vsInstance.name }];
		} else {
			App.breadcrumbs.segments = [{ label: "Vintage Story Instances", href: resolve("/vs-instances") }, { label: "???" }];
		}
	});

	let deleteDialogOpen: boolean = $state(false);
</script>

<Typo.H1>{vsInstance ? `${vsInstance?.name}` : "Not found"}</Typo.H1>
<Typo.Leading>Manage this Vintage Story Instance's mods, settings, etc...</Typo.Leading>

{#if vsInstance === undefined}
	<Typo.P>This Vintage Story Instance doesn't exist.</Typo.P>
{:else}
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
{/if}
