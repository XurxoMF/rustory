<script lang="ts">
	import IconPlus from "@tabler/icons-svelte/icons/plus";

	import { formatTime } from "$lib/utils";

	import { App } from "$lib/classes/App.svelte";

	import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

	import { VSInstanceState, type VSInstance } from "$lib/classes/vs/VSInstance.svelte";
	import { VSVersionState } from "$lib/classes/vs/VSVersion.svelte";

	import { H1, Leading, P } from "$lib/components/ui/typography";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as Field from "$lib/components/ui/field";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { Spinner } from "$lib/components/ui/spinner";
	import { Separator } from "$lib/components/ui/separator";
	import * as Tooltip from "$lib/components/ui/tooltip";

	App.breadcrumbs.segments = [{ label: "Vintage Story Instances", href: "/vs-instances" }];

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
			throw new RustoryError(RustoryErrorCodes.GENERIC_ERROR, "There was an error deleting the Vintage Story Instance!");
		}
	}
</script>

<div class="absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl">
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="icon" onclick={() => App.toaster.toast.info("Coming soon...")}>
					<IconPlus />
					<span class="sr-only">Create new Vintage Story Instance</span>
				</Button>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Content>
			<p>Create new Vintage Story Instance</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>

<H1>Vintage Story Instances</H1>
<Leading>View and manage your Vintage Story Instances.</Leading>

<div class="mt-6">
	<!-- List of Vintage Story Instances -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each App.data.vsInstances as vsInstance (vsInstance.id)}
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-lg">{vsInstance.name}</Card.Title>

					<Card.Description class="line-clamp-2">{vsInstance.description}</Card.Description>

					<Card.Action>
						{#if vsInstance.version.state === VSVersionState.INSTALLING}
							<Badge>
								<Spinner />
								Installing...
							</Badge>
						{:else if vsInstance.version.state === VSVersionState.DELETING || vsInstance.state === VSInstanceState.DELETING}
							<Badge variant="destructive">
								<Spinner />
								Deleting...
							</Badge>
						{:else if vsInstance.state === VSInstanceState.BACKUPING}
							<Badge>
								<Spinner />
								Backing up...
							</Badge>
						{:else if vsInstance.state === VSInstanceState.PLAYING_CLIENT}
							<Badge>
								<Spinner />
								Running client...
							</Badge>
						{:else if vsInstance.state === VSInstanceState.PLAYING_SERVER}
							<Badge>
								<Spinner />
								Running server...
							</Badge>
						{:else}
							<Badge variant="outline">Stopped</Badge>
						{/if}
					</Card.Action>
				</Card.Header>

				<Card.Content class="mt-auto">
					<div class="flex items-center justify-between gap-2 py-1">
						<P class="text-muted-foreground">Vintage Story Version</P>

						<P class="font-bold">{vsInstance.version.version}</P>
					</div>

					<Separator />

					<div class="flex items-center justify-between gap-2 py-1">
						<P class="text-muted-foreground">Installed mods</P>

						<P class="font-bold">{vsInstance.mods.length}</P>
					</div>

					<Separator />

					<div class="flex items-center justify-between gap-2 py-1">
						<P class="text-muted-foreground">Last time played</P>

						<P class="font-bold">
							{vsInstance.lastTimePlayed === 0 ? "Never" : new Date(vsInstance.lastTimePlayed).toLocaleString(App.config.locale)}
						</P>
					</div>

					<Separator />

					<div class="flex items-center justify-between gap-2 py-1">
						<P class="text-muted-foreground">Total time played</P>

						<P class="font-bold">
							{`${formatTime(vsInstance.totalTimePlayed, { to: "minutes" })} minutes`}
						</P>
					</div>
				</Card.Content>

				<Card.Footer class="flex justify-end gap-2">
					<Dialog.Root>
						<Dialog.Trigger class={[buttonVariants({ variant: "destructive" }), "flex-1"]}>Delete</Dialog.Trigger>

						<Dialog.Content class="sm:max-w-120">
							<Dialog.Header>
								<Dialog.Title>Delete {vsInstance.name}</Dialog.Title>

								<Dialog.Description>Delete this Vintage Story Instance? This action cannot be undone.</Dialog.Description>
							</Dialog.Header>

							<Field.Set>
								<Field.Group>
									<Field.Field orientation="horizontal">
										<Checkbox id="delete-contents" bind:checked={deleteContents} />

										<Field.Content>
											<Field.Label for="delete-contents">Delte contents?</Field.Label>

											<Field.Description>Enable to delete the version, data and backups of this instance.</Field.Description>
										</Field.Content>
									</Field.Field>
								</Field.Group>
							</Field.Set>

							<Dialog.Footer>
								<Dialog.Close onclick={() => (deleteContents = false)} class={buttonVariants({ variant: "outline" })}>Cancel</Dialog.Close>

								<Button variant="destructive" onclick={() => handleDeletetion(vsInstance)}>Delete</Button>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>

					<Button class="flex-1" variant="outline" onclick={() => App.toaster.toast.info("Not implemented yet!")}>Edit</Button>

					<Button class="flex-1" onclick={() => App.toaster.toast.info("Not implemented yet!")}>Play</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
