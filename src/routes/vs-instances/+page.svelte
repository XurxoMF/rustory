<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import { RustoryError, RustoryErrorCodes } from "$lib/classes/errors/RustoryError.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import { H1, Leading } from "$lib/components/ui/typography";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as Field from "$lib/components/ui/field";

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

<H1>Vintage Story Instances</H1>
<Leading>View and manage your Vintage Story Instances.</Leading>

<div class="mt-6">
	<!-- List of Vintage Story Instances -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
		{#each App.data.vsInstances as vsInstance (vsInstance.id)}
			<div class="flex flex-col gap-4 rounded-md border-border p-4">
				<p>{vsInstance.name} · {vsInstance.state}</p>
				<p>{vsInstance.version.version} · {vsInstance.version.state}</p>

				<Dialog.Root>
					<Dialog.Trigger type="button" class={buttonVariants({ variant: "destructive" })}>Delete</Dialog.Trigger>

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

							<Button onclick={() => handleDeletetion(vsInstance)}>Save changes</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		{/each}
	</div>
</div>
