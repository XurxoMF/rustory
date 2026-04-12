<script lang="ts">
	import { tick } from "svelte";
	import { error } from "@tauri-apps/plugin-log";

	import IconSelector from "@tabler/icons-svelte/icons/selector";

	import { App } from "$lib/classes/App.svelte";
	import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";

	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";

	let vsVersions: RAPIVSVersion[] = $state([]);
	let vsVersionsOpen = $state(false);
	let vsVersionsValue = $state("");
	const vsVersionsSelected = $derived(vsVersions.find((f) => f.version === vsVersionsValue));
	let vsVersionsTriggerRef = $state<HTMLButtonElement>(null!);

	App.request
		.get("https://api.rustory.xyz/versions")
		.then((res): Promise<RAPIVSVersionJSON[]> => res.json())
		.then((json) => (vsVersions = json.map((v) => new RAPIVSVersion({ ...v }))))
		.catch((err) => {
			error(`There was an error loading the Vintage Story Versions from the Rustory API:\n${err}`);
		});
</script>

<Field.Set class="px-4">
	<Field.Group>
		<!-- Vintage Story Version -->
		<Field.Field>
			<Field.Label for="vs-version">Vintage Story Version</Field.Label>

			<Popover.Root bind:open={vsVersionsOpen}>
				<Popover.Trigger bind:ref={vsVersionsTriggerRef}>
					{#snippet child({ props })}
						<Button {...props} id="vs-version" variant="outline" class="justify-between" role="combobox" aria-expanded={vsVersionsOpen}>
							{vsVersionsSelected?.version || "Select a framework..."}

							<IconSelector class="opacity-50" />
						</Button>
					{/snippet}
				</Popover.Trigger>

				<Popover.Content class="w-(--bits-floating-anchor-width) p-0">
					<Command.Root>
						<Command.Input placeholder="Select the VS Version..." />

						<Command.List>
							<Command.Empty>No VS Versions found.</Command.Empty>

							<Command.Group value="frameworks">
								{#each vsVersions as vsVersion (vsVersion.version)}
									<Command.Item
										data-checked={vsVersion.version === vsVersionsValue}
										value={vsVersion.version}
										onSelect={() => {
											vsVersionsValue = vsVersion.version;

											vsVersionsOpen = false;

											// Refocus the trigger button when the user selects an item so users can continue navigating the rest of the form with the keyboard.
											tick().then(() => {
												vsVersionsTriggerRef.focus();
											});
										}}
										class="flex w-full justify-between"
									>
										<span>{vsVersion.version}</span>
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>

			<Field.Description>Select the Vintage Story Version to use.</Field.Description>
		</Field.Field>
	</Field.Group>
</Field.Set>

<Button type="button">Create</Button>
