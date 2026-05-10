<script lang="ts" module>
	export type DeleteInstanceDialogProps = Dialog.RootProps & {
		vsInstance: VSInstance;
		onSuccess?: (() => void) | undefined;
	};
</script>

<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import * as Dialog from "$lib/components/ui/dialog";
	import * as Button from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import * as Checkbox from "$lib/components/ui/checkbox";

	let { open = $bindable(false), vsInstance, onSuccess, ...restProps }: DeleteInstanceDialogProps = $props();

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

			onSuccess?.();
		} catch (err) {
			if (err instanceof AppError) throw err;
			App.logger.error(`There was an error deleting the Vintage Story Instance: ${err}`);
			throw new AppError(AppErrorCodes.GENERIC_ERROR, "There was an error deleting the Vintage Story Instance!");
		}
	}
</script>

<Dialog.Root bind:open {...restProps}>
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
