<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconPlus from "@tabler/icons-svelte/icons/plus";

	import { formatTime } from "$lib/utils";

	import { App } from "$lib/classes/App.svelte";

	import { VSInstanceState } from "$lib/classes/vs/VSInstance.svelte";
	import { VSVersionState } from "$lib/classes/vs/VSVersion.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Button from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Badge from "$lib/components/ui/badge";
	import * as Spinner from "$lib/components/ui/spinner";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Table from "$lib/components/ui/table";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	import DeleteVSInstanceDialog from "$lib/components/vs-instances/delete-dialog.svelte";

	App.breadcrumbs.segments = [{ label: "Vintage Story Instances" }];

	let idDeletingInstance: string | null = $state(null);
</script>

<Typo.H1>Vintage Story Instances</Typo.H1>
<Typo.Leading>Play and manage your Vintage Story Instances.</Typo.Leading>

<!-- List of Vintage Story Instances -->
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
	{#each App.data.vsInstances as vsInstance (vsInstance.id)}
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-lg">{vsInstance.name}</Card.Title>

				<Card.Description class="line-clamp-2">{vsInstance.description}</Card.Description>

				<Card.Action>
					{@const vsVersion = App.data.vsVersions.find((v) => v.version === vsInstance.version)}

					{#if vsVersion === undefined}
						<Badge.Root variant="destructive">Stopped</Badge.Root>
					{:else if vsVersion.state === VSVersionState.INSTALLING}
						<Badge.Root>
							<Spinner.Root />
							Installing...
						</Badge.Root>
					{:else if vsVersion.state === VSVersionState.DELETING || vsInstance.state === VSInstanceState.DELETING}
						<Badge.Root variant="destructive">
							<Spinner.Root />
							Deleting...
						</Badge.Root>
					{:else if vsInstance.state === VSInstanceState.BACKUPING}
						<Badge.Root>
							<Spinner.Root />
							Backing up...
						</Badge.Root>
					{:else if vsInstance.state === VSInstanceState.PLAYING_CLIENT}
						<Badge.Root>
							<Spinner.Root />
							Running client...
						</Badge.Root>
					{:else if vsInstance.state === VSInstanceState.PLAYING_SERVER}
						<Badge.Root>
							<Spinner.Root />
							Running server...
						</Badge.Root>
					{:else}
						<Badge.Root variant="outline">Stopped</Badge.Root>
					{/if}
				</Card.Action>
			</Card.Header>

			<Card.Content class="mt-auto">
				<Table.Root>
					<Table.Body>
						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Vintage Story Version</Table.Cell>
							<Table.Cell class="font-bold" align="right">{vsInstance.version}</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Installed mods</Table.Cell>
							<Table.Cell class="font-bold" align="right">{vsInstance.mods.length}</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Last time played</Table.Cell>
							<Table.Cell class="font-bold" align="right">
								{vsInstance.lastTimePlayed === 0 ? "Never" : new Date(vsInstance.lastTimePlayed).toLocaleString(App.config.locale)}
							</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Total time played</Table.Cell>
							<Table.Cell class="font-bold" align="right">
								{`${formatTime(vsInstance.totalTimePlayed, { to: "minutes" })} minutes`}
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</Card.Content>

			<Card.Footer class="flex justify-end gap-2">
				<Button.Root class="flex-1" variant="destructive" onclick={() => (idDeletingInstance = vsInstance.id)}>Delete</Button.Root>

				<Button.Root class="flex-1" variant="outline" onclick={() => goto(resolve("/vs-instances/[slug]", { slug: vsInstance.id }))}>
					Manage
				</Button.Root>

				<Button.Root class="flex-1" onclick={() => App.toaster.toast.info("Not implemented yet!")}>Play</Button.Root>
			</Card.Footer>

			<DeleteVSInstanceDialog
				open={idDeletingInstance === vsInstance.id}
				onOpenChange={(open) => {
					if (!open) idDeletingInstance = null;
				}}
				onSuccess={() => (idDeletingInstance = null)}
				{vsInstance}
			/>
		</Card.Root>
	{/each}
</div>

<FloatingMenu.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button.Root {...props} variant="outline" size="icon" onclick={() => goto(resolve("/vs-instances/create"))}>
					<IconPlus />
					<span class="sr-only">Create new Vintage Story Instance</span>
				</Button.Root>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Content>
			<p>Create new Vintage Story Instance</p>
		</Tooltip.Content>
	</Tooltip.Root>
</FloatingMenu.Root>
