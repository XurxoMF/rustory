<script lang="ts">
	import { tick } from "svelte";
	import { error } from "@tauri-apps/plugin-log";
	import { open } from "@tauri-apps/plugin-dialog";

	import IconSelector from "@tabler/icons-svelte/icons/selector";
	import IconFolder from "@tabler/icons-svelte/icons/folder";

	import { App } from "$lib/classes/App.svelte";
	import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";

	import { H1, Leading } from "$lib/components/ui/typography";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import { Slider } from "$lib/components/ui/slider";
	import { Switch } from "$lib/components/ui/switch";

	App.breadcrumbs.segments = [
		{ label: "VS Instances", href: "/vs-instances" },
		{ label: "Create", href: "/vs-instances/create" }
	];

	let name = $state("");
	let path = $state("");

	let vsVersions: RAPIVSVersion[] = $state([]);
	let vsVersionsOpen = $state(false);
	let vsVersionsValue = $state("");
	const vsVersionsSelected = $derived(vsVersions.find((f) => f.version === vsVersionsValue));
	let vsVersionsTriggerRef = $state<HTMLButtonElement>(null!);

	let startParams = $state("");

	let backupsLimit = $state(3);
	let backupsAuto = $state(false);
	let compressionLevel = $state(4);

	// TODO: Add this fields
	// let mesaGlThread = $state(false);
	// let envVars = $state([]);

	App.request
		.get("https://api.rustory.xyz/versions")
		.then((res): Promise<RAPIVSVersionJSON[]> => res.json())
		.then((json) => (vsVersions = json.map((v) => new RAPIVSVersion({ ...v }))))
		.catch((err) => {
			error(`There was an error loading the Vintage Story Versions from the Rustory API:\n${err}`);
		});
</script>

<H1>Create a Vintage Story Instance</H1>
<Leading>Create a new Vintage Story Instance for your needs.</Leading>

<div class="mt-6">
	<Field.Group>
		<Field.Set>
			<Field.Legend>General</Field.Legend>
			<Field.Description>General settings for the Vintage Story Instance.</Field.Description>

			<Field.Group>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<!-- Name-->
					<Field.Field>
						<Field.Label for="name">Name</Field.Label>

						<Input bind:value={name} id="name" placeholder="Choose a name..." />

						<Field.Description>Give the Vintage Story Instance a name.</Field.Description>
					</Field.Field>

					<!-- Vintage Story Version -->
					<Field.Field>
						<Field.Label for="vs-version">Vintage Story Version</Field.Label>

						<Popover.Root bind:open={vsVersionsOpen}>
							<Popover.Trigger bind:ref={vsVersionsTriggerRef}>
								{#snippet child({ props })}
									<Button {...props} id="vs-version" variant="outline" class="justify-between" role="combobox" aria-expanded={vsVersionsOpen}>
										{vsVersionsSelected?.version || "Select a version..."}

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
				</div>

				<!-- Path-->
				<Field.Field>
					<Field.Label for="path">Directory</Field.Label>

					<div class="flex gap-2">
						<Button
							id="path"
							size="icon"
							variant="outline"
							onclick={async () => {
								const selected = await open({
									directory: true,
									defaultPath: App.info.dataDir.path,
									recursive: true,
									title: "Select a directory"
								});

								if (selected) {
									path = selected;
								}
							}}
						>
							<IconFolder />
						</Button>

						<Input value={path} placeholder="Select a directory..." readonly />
					</div>

					<Field.Description>Directory where Vintage Story Insta nces will be stored by default.</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>

		<Field.Separator />

		<Field.Set>
			<Field.Legend>Backups</Field.Legend>
			<Field.Description>Backup settings for the Vintage Story Instance.</Field.Description>

			<Field.Group>
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
					<!-- Backups Auto -->
					<Field.Field>
						<Field.Label for="backups-auto">Automatic backups</Field.Label>

						<Switch id="backups-auto" bind:checked={backupsAuto} />

						<Field.Description>Enable automatic backups for the Vintage Story Instance.</Field.Description>
					</Field.Field>

					<!-- Backups Limit -->
					<Field.Field>
						<Field.Label for="backups-limit">Backups limit</Field.Label>

						<Slider type="single" id="backups-limit" min={1} max={10} step={1} bind:value={backupsLimit} />

						<Field.Description>Set the maximum ammount of backups for the Vintage Story Instance on a 1 to 10 range.</Field.Description>
					</Field.Field>

					<!-- Backups Cmpression Level -->
					<Field.Field class="lg:col-span-2 2xl:col-auto">
						<Field.Label for="backups-compression-level">Backups compression level</Field.Label>

						<Slider type="single" id="backups-compression-level" min={1} max={9} step={1} bind:value={compressionLevel} />

						<Field.Description>Set the compression level for the Vintage Story Instance backups.</Field.Description>
					</Field.Field>
				</div>
			</Field.Group>
		</Field.Set>

		<Field.Separator />

		<Field.Set>
			<Field.Legend>Advanced</Field.Legend>
			<Field.Description>Advanced settings for the Vintage Story Instance.</Field.Description>

			<Field.Group>
				<!-- Start Params -->
				<Field.Field>
					<Field.Label for="start-params">Start params</Field.Label>

					<Input bind:value={startParams} id="start-params" placeholder="Set the start params..." />

					<Field.Description>Set the start params for the Vintage Story Instance.</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>

		<Button type="button">Create</Button>
	</Field.Group>
</div>
