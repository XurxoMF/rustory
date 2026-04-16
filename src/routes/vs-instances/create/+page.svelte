<script lang="ts">
	import { tick } from "svelte";
	import { debug, error } from "@tauri-apps/plugin-log";
	import { open } from "@tauri-apps/plugin-dialog";

	import IconSelector from "@tabler/icons-svelte/icons/selector";
	import IconFolder from "@tabler/icons-svelte/icons/folder";

	import { cleanPath } from "$lib/utils";

	import { App } from "$lib/classes/App.svelte";
	import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";
	import { Directory } from "$lib/classes/utils/Directory.svelte";
	import { File } from "$lib/classes/utils/File.svelte";

	import { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import { H1, Leading } from "$lib/components/ui/typography";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import { Slider } from "$lib/components/ui/slider";
	import { Switch } from "$lib/components/ui/switch";
	import * as List from "$lib/components/ui/list";

	App.breadcrumbs.segments = [
		{ label: "VS Instances", href: "/vs-instances" },
		{ label: "Create", href: "/vs-instances/create" }
	];

	let name: string = $state("");
	let nameErrors: string[] = $state([]);

	let dir: Directory | undefined = $state();
	let dirErrors: string[] = $state([]);

	let vsVersions: RAPIVSVersion[] = $state([]);
	let vsVersionsOpen: boolean = $state(false);
	let vsVersionsValue: string = $state("");
	let vsVersionsValueErrors: string[] = $state([]);
	const vsVersionsSelected: RAPIVSVersion | undefined = $derived(vsVersions.find((f) => f.version === vsVersionsValue));
	let vsVersionsTriggerRef: HTMLButtonElement = $state<HTMLButtonElement>(null!);

	let backupsLimit: number = $state(3);
	let backupsLimitErrors: string[] = $state([]);

	let backupsAuto: boolean = $state(false);
	let backupsAutoErrors: string[] = $state([]);

	let backupsCompressionLevel: number = $state(4);
	let backupsCompressionLevelErrors: string[] = $state([]);

	let startParams: string = $state("");
	let startParamsErrors: string[] = $state([]);

	let envVars: string = $state("");
	let envVarsErrors: string[] = $state([]);

	let mesaGlThread: boolean = $state(false);
	let mesaGlThreadErrors: string[] = $state([]);

	App.request
		.get("https://api.rustory.xyz/versions")
		.then((res): Promise<RAPIVSVersionJSON[]> => res.json())
		.then((json) => (vsVersions = json.map((v) => new RAPIVSVersion({ ...v }))))
		.catch((err) => {
			error(`There was an error loading the Vintage Story Versions from the Rustory API:\n${err}`);
		});

	async function create() {
		nameErrors = [];
		dirErrors = [];
		vsVersionsValueErrors = [];
		backupsLimitErrors = [];
		backupsAutoErrors = [];
		backupsCompressionLevelErrors = [];
		startParamsErrors = [];
		envVarsErrors = [];
		mesaGlThreadErrors = [];

		debug("Checking errors...");

		if (name.length < 5 || name.length > 50) nameErrors.push("Name must be at least 5 characters long and a maximum of 50.");
		if (App.data.vsInstances.some((i) => i.name.toLowerCase() === name.toLowerCase())) nameErrors.push("Name must be unique.");

		if (dir !== undefined) {
			const isDirEmpty = await dir.isEmpty();
			if (isDirEmpty) dirErrors.push("Directory must not be empty.");
		}

		if (vsVersionsValue === "") vsVersionsValueErrors.push("You must select a Vintage Story Version.");

		if (backupsLimit < 1 || backupsLimit > 10) backupsLimitErrors.push("Backups limit must be at least 1 and a maximum of 10.");

		if (backupsCompressionLevel < 1 || backupsCompressionLevel > 9)
			backupsCompressionLevelErrors.push("Backups compression level must be at least 1 and a maximum of 9.");

		if (
			nameErrors.length <= 0 &&
			dirErrors.length <= 0 &&
			vsVersionsValueErrors.length <= 0 &&
			backupsLimitErrors.length <= 0 &&
			backupsAutoErrors.length <= 0 &&
			backupsCompressionLevelErrors.length <= 0 &&
			startParamsErrors.length <= 0 &&
			envVarsErrors.length <= 0 &&
			mesaGlThreadErrors.length <= 0
		) {
			debug("Creating a new Vintage Story Instance...");

			const id = crypto.randomUUID();

			if (dir === undefined) {
				const cleanName = cleanPath(name);
				const defaultPath = await App.config.vsInstancesDir.join(cleanName);
				dir = await Directory.create(defaultPath);
			}

			const versionPath = await dir.join("Version");
			const versionDir = await Directory.create(versionPath);

			const dataPath = await dir.join("Data");
			const dataDir = await Directory.create(dataPath);

			const backupsPath = await dir.join("Backups");
			const backupsDir = await Directory.create(backupsPath);

			const filePath = await dir.join("instance.json");
			const file = await File.create(filePath);

			const vsInstance = await VSInstance.create({
				file,
				id,
				name,
				dir,
				versionDir,
				dataDir,
				backupsDir,
				version: vsVersionsValue,
				startParams,
				backupsLimit,
				backupsAuto,
				backupsCompressionLevel,
				lastTimePlayed: 0,
				totalTimePlayed: 0,
				envVars,
				mesaGlThread
			});

			await vsInstance.save();

			await App.data.setVsInstances([...App.data.vsInstances, vsInstance]);

			name = "";
			dir = undefined;
			vsVersionsValue = "";
			backupsLimit = 3;
			backupsAuto = false;
			backupsCompressionLevel = 4;
			startParams = "";
			envVars = "";
			mesaGlThread = false;
		}
	}
</script>

<H1>Create a Vintage Story Instance</H1>
<Leading>Create a new Vintage Story Instance for your needs.</Leading>

<div class="mt-6">
	<Field.Group>
		<Field.Set>
			<Field.Legend>General</Field.Legend>
			<Field.Description>General settings.</Field.Description>

			<Field.Group>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<!-- Name-->
					<Field.Field data-invalid={nameErrors.length > 0}>
						<Field.Label for="name">Name</Field.Label>

						<Input bind:value={name} id="name" placeholder="Choose a name..." aria-invalid={nameErrors.length > 0} />

						{#if error.name.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each nameErrors as error (error)}
										<List.Item>
											{error}
										</List.Item>
									{/each}
								</List.Unordered>
							</Field.Error>
						{/if}

						<Field.Description>This is the name of the instance. It must be at least 5 characters long and a maximum of 50.</Field.Description>
					</Field.Field>

					<!-- Vintage Story Version -->
					<Field.Field data-invalid={vsVersionsValueErrors.length > 0}>
						<Field.Label for="vs-version">Vintage Story Version</Field.Label>

						<Popover.Root bind:open={vsVersionsOpen}>
							<Popover.Trigger bind:ref={vsVersionsTriggerRef}>
								{#snippet child({ props })}
									<Button
										{...props}
										id="vs-version"
										variant="outline"
										class="justify-between"
										role="combobox"
										aria-expanded={vsVersionsOpen}
										aria-invalid={vsVersionsValueErrors.length > 0}
									>
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

										<Command.Group>
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

						{#if vsVersionsValueErrors.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each vsVersionsValueErrors as error (error)}
										<List.Item>
											{error}
										</List.Item>
									{/each}
								</List.Unordered>
							</Field.Error>
						{/if}

						<Field.Description>The game version you select will be installed here.</Field.Description>
					</Field.Field>
				</div>

				<!-- Path-->
				<Field.Field data-invalid={dirErrors.length > 0}>
					<Field.Label for="path">Directory</Field.Label>

					<div class="flex gap-2">
						<Button
							id="path"
							size="icon"
							variant="outline"
							onclick={async () => {
								const path = await open({
									directory: true,
									defaultPath: App.info.dataDir.path,
									recursive: true,
									title: "Select a directory"
								});

								if (path) {
									dir = await Directory.create(path);
								}
							}}
							aria-invalid={dirErrors.length > 0}
						>
							<IconFolder />
						</Button>

						<Input value={dir?.path || ""} placeholder="Select a directory..." readonly aria-invalid={dirErrors.length > 0} />
					</div>

					{#if dirErrors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each dirErrors as error (error)}
									<List.Item>
										{error}
									</List.Item>
								{/each}
							</List.Unordered>
						</Field.Error>
					{/if}

					<Field.Description>
						The game, the data and the backups will be stored here. It'll use the default path if you don't select one.
					</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>

		<Field.Separator />

		<Field.Set>
			<Field.Legend>Backups</Field.Legend>
			<Field.Description>Backup settings.</Field.Description>

			<Field.Group>
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
					<!-- Backups Auto -->
					<Field.Field data-invalid={backupsAutoErrors.length > 0}>
						<Field.Label for="backups-auto">Automatic backups</Field.Label>

						<Switch id="backups-auto" bind:checked={backupsAuto} aria-invalid={backupsAutoErrors.length > 0} />

						{#if backupsAutoErrors.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each backupsAutoErrors as error (error)}
										<List.Item>
											{error}
										</List.Item>
									{/each}
								</List.Unordered>
							</Field.Error>
						{/if}

						<Field.Description>If this option is enabled, backups will be made before you play.</Field.Description>
					</Field.Field>

					<!-- Backups Limit -->
					<Field.Field data-invalid={backupsLimitErrors.length > 0}>
						<Field.Label for="backups-limit">Backups limit</Field.Label>

						<Slider
							type="single"
							id="backups-limit"
							min={1}
							max={10}
							step={1}
							bind:value={backupsLimit}
							aria-invalid={backupsLimitErrors.length > 0}
						/>

						{#if backupsLimitErrors.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each backupsLimitErrors as error (error)}
										<List.Item>
											{error}
										</List.Item>
									{/each}
								</List.Unordered>
							</Field.Error>
						{/if}

						<Field.Description>You need at least 1 backup and can have a maximum of 10 backups.</Field.Description>
					</Field.Field>

					<!-- Backups Cmpression Level -->
					<Field.Field class="lg:col-span-2 2xl:col-auto" data-invalid={backupsCompressionLevelErrors.length > 0}>
						<Field.Label for="backups-compression-level">Backups compression level</Field.Label>

						<Slider
							type="single"
							id="backups-compression-level"
							min={1}
							max={9}
							step={1}
							bind:value={backupsCompressionLevel}
							aria-invalid={backupsCompressionLevelErrors.length > 0}
						/>

						{#if backupsCompressionLevelErrors.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each backupsCompressionLevelErrors as error (error)}
										<List.Item>
											{error}
										</List.Item>
									{/each}
								</List.Unordered>
							</Field.Error>
						{/if}

						<Field.Description>More compression means smaller backups but longer backup times.</Field.Description>
					</Field.Field>
				</div>
			</Field.Group>
		</Field.Set>

		<Field.Separator />

		<Field.Set>
			<Field.Legend>Advanced</Field.Legend>
			<Field.Description>Advanced settings.</Field.Description>

			<Field.Group>
				<!-- Start Params -->
				<Field.Field data-invalid={startParamsErrors.length > 0}>
					<Field.Label for="start-params">Start params</Field.Label>

					<Input
						bind:value={startParams}
						id="start-params"
						placeholder="--param1=value1 --param2=value2..."
						aria-invalid={startParamsErrors.length > 0}
					/>

					{#if startParamsErrors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each startParamsErrors as error (error)}
									<List.Item>
										{error}
									</List.Item>
								{/each}
							</List.Unordered>
						</Field.Error>
					{/if}

					<Field.Description>
						You can change how the game behaves adding this params. You can check the documentation on the Vintage Story Wiki.
					</Field.Description>
				</Field.Field>

				<!-- ENV Vars -->
				<Field.Field data-invalid={envVarsErrors.length > 0}>
					<Field.Label for="env-vars">Start params</Field.Label>

					<Input bind:value={envVars} id="env-vars" placeholder="NEV1=value1,ENV2=value2..." aria-invalid={envVarsErrors.length > 0} />

					{#if envVarsErrors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each envVarsErrors as error (error)}
									<List.Item>
										{error}
									</List.Item>
								{/each}
							</List.Unordered>
						</Field.Error>
					{/if}

					<Field.Description>You can modify some things with ENV variables, not only for Vintage Story but for 3rd party tools.</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>

		{#if App.info.osType === "linux"}
			<Field.Separator />

			<Field.Set>
				<Field.Legend>Linux</Field.Legend>
				<Field.Description>Linux specific settings.</Field.Description>

				<Field.Group>
					<!-- MesaGL Thread -->
					<Field.Field data-invalid={mesaGlThreadErrors.length > 0}>
						<Field.Label for="mesagl-thread">MesaGL Thread</Field.Label>

						<Switch id="mesagl-thread" bind:checked={mesaGlThread} aria-invalid={mesaGlThreadErrors.length > 0} />

						{#if mesaGlThreadErrors.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each mesaGlThreadErrors as error (error)}
										<List.Item>
											{error}
										</List.Item>
									{/each}
								</List.Unordered>
							</Field.Error>
						{/if}

						<Field.Description>
							MesaGL Thread may improve performance on some Linux systems. Disable it if it causes issues for you.
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</Field.Set>
		{/if}

		<Button onclick={create}>Create</Button>
	</Field.Group>
</div>
