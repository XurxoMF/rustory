<script lang="ts">
	import { untrack } from "svelte";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconPlus from "@tabler/icons-svelte/icons/plus";

	import { formatTime } from "$lib/utils";

	import { App } from "$lib/classes/App.svelte";

	import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

	import { VSInstanceState, type VSInstance } from "$lib/classes/vs/VSInstance.svelte";
	import { VSVersionState } from "$lib/classes/vs/VSVersion.svelte";

	import * as Button from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Checkbox from "$lib/components/ui/checkbox";
	import * as Field from "$lib/components/ui/field";
	import * as Card from "$lib/components/ui/card";
	import * as Badge from "$lib/components/ui/badge";
	import * as Spinner from "$lib/components/ui/spinner";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Table from "$lib/components/ui/table";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	let { data }: { data: { instances: VSInstance[] } } = $props();

	const staticData = untrack(() => data);

	let deleteContents: boolean = $state(false);

	/**
	 * Delete a Vintage Story Instance.
	 */
	async function handleDeletetion(vsInstance: VSInstance): Promise<void> {
		try {
			App.logger.info(`Deleting the Vintage Story Instance ${vsInstance.name}...`);

			await vsInstance.delete(deleteContents);

			await App.data.setVsInstances(App.data.vsInstances.filter((i) => i.id !== vsInstance.id));

			App.logger.info("Vintage Story Instance deleted successfully!");

			App.toaster.toast.success("Vintage Story Instance deleted successfully!");

			deleteContents = false;
		} catch (err) {
			App.logger.error(`There was an error deleting the Vintage Story Instance:\n${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error deleting the Vintage Story Instance!");
		}
	}
</script>

<!-- List of Vintage Story Instances -->
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
	{#each staticData.instances as vsInstance (vsInstance.id)}
		<Card.Root>
			<Card.Header>
				<Card.Title class="text-lg">{vsInstance.name}</Card.Title>

				<Card.Description class="line-clamp-2">{vsInstance.description}</Card.Description>

				<Card.Action>
					{#if vsInstance.version.state === VSVersionState.INSTALLING}
						<Badge.Root>
							<Spinner.Root />
							Installing...
						</Badge.Root>
					{:else if vsInstance.version.state === VSVersionState.DELETING || vsInstance.state === VSInstanceState.DELETING}
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
							<Table.Cell class="font-bold" align="right">{vsInstance.version.version}</Table.Cell>
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
				<Dialog.Root>
					<Dialog.Trigger class={[Button.rootVariants({ variant: "destructive" }), "flex-1"]}>Delete</Dialog.Trigger>

					<Dialog.Content class="sm:max-w-120">
						<Dialog.Header>
							<Dialog.Title>Delete {vsInstance.name}</Dialog.Title>

							<Dialog.Description>Delete this Vintage Story Instance? This action cannot be undone.</Dialog.Description>
						</Dialog.Header>

						<Field.Set>
							<Field.Group>
								<Field.Field orientation="horizontal">
									<Checkbox.Root id="delete-contents" bind:checked={deleteContents} />

									<Field.Content>
										<Field.Label for="delete-contents">Delte contents?</Field.Label>

										<Field.Description>Enable to delete the version, data and backups of this instance.</Field.Description>
									</Field.Content>
								</Field.Field>
							</Field.Group>
						</Field.Set>

						<Dialog.Footer>
							<Dialog.Close onclick={() => (deleteContents = false)} class={Button.rootVariants({ variant: "outline" })}>Cancel</Dialog.Close>

							<Button.Root variant="destructive" onclick={() => handleDeletetion(vsInstance)}>Delete</Button.Root>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>

				<Button.Root class="flex-1" variant="outline" onclick={() => goto(resolve("/vs-instances/[slug]", { slug: vsInstance.id }))}>
					Manage
				</Button.Root>

				<Button.Root class="flex-1" onclick={() => App.toaster.toast.info("Not implemented yet!")}>Play</Button.Root>
			</Card.Footer>
		</Card.Root>
	{/each}
</div>

<FloatingMenu.Root>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button.Root {...props} variant="outline" size="icon" onclick={() => goto(resolve("/vs-instances/new"))}>
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
