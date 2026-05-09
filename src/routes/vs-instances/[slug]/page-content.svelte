<script lang="ts">
	import { untrack } from "svelte";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconPencil from "@tabler/icons-svelte/icons/pencil";
	import IconTrash from "@tabler/icons-svelte/icons/trash";

	import { type VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Button from "$lib/components/ui/button";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	import DeleteVSInstanceDialog from "$lib/components/vs-instances/delete-dialog.svelte";

	let { data }: { data: { vsInstance: VSInstance } } = $props();

	const staticData = untrack(() => data);

	const vsInstance = staticData.vsInstance;

	let deleteDialogOpen: boolean = $state(false);
</script>

<Typo.P>Checking {vsInstance.name}</Typo.P>

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
