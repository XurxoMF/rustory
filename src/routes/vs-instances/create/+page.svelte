<script lang="ts" module>
	type Form = {
		name: string;
		description: string;
		dir: Directory;
		version: RAPIVSVersion;
		backupsLimit: number;
		backupsAuto: boolean;
		backupsCompressionLevel: number;
		startParams: string;
		envVars: string;
		mesaGlThread: boolean;
	};

	type Errors = {
		name: string[];
		description: string[];
		dir: string[];
		version: string[];
		backupsLimit: string[];
		backupsAuto: string[];
		backupsCompressionLevel: string[];
		startParams: string[];
		envVars: string[];
		mesaGlThread: string[];
	};

	type Checkers = {
		name: (name: string) => Promise<string[]>;
		description: (description: string) => Promise<string[]>;
		dir: (dir: Directory) => Promise<string[]>;
		version: (version: RAPIVSVersion) => Promise<string[]>;
		backupsLimit: (backupsLimit: number) => Promise<string[]>;
		backupsAuto: (backupsAuto: boolean) => Promise<string[]>;
		backupsCompressionLevel: (backupsCompressionLevel: number) => Promise<string[]>;
		startParams: (startParams: string) => Promise<string[]>;
		envVars: (envVars: string) => Promise<string[]>;
		mesaGlThread: (mesaGlThread: boolean) => Promise<string[]>;
	};
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { tick, untrack } from "svelte";
	import { Debounced } from "runed";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import { open } from "@tauri-apps/plugin-dialog";

	import IconSelector from "@tabler/icons-svelte/icons/selector";
	import IconFolder from "@tabler/icons-svelte/icons/folder";
	import IconArrowDown from "@tabler/icons-svelte/icons/arrow-down";
	import IconCheck from "@tabler/icons-svelte/icons/check";

	import { cleanForPath } from "$lib/utils";

	import { App } from "$lib/classes/App.svelte";

	import { RAPIVSVersion } from "$lib/classes/api/RAPIVSVersion.svelte";

	import { Directory } from "$lib/classes/utils/Directory.svelte";
	import { File } from "$lib/classes/utils/File.svelte";

	import { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
	import { VSVersion } from "$lib/classes/vs/VSVersion.svelte";

	import { H1, Leading } from "$lib/components/ui/typography";
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import { Slider } from "$lib/components/ui/slider";
	import { Switch } from "$lib/components/ui/switch";
	import * as List from "$lib/components/ui/list";
	import { Textarea } from "$lib/components/ui/textarea";

	let { data }: PageProps = $props();

	App.breadcrumbs.segments = [
		{ label: "Vintage Story Instances", href: resolve("/vs-instances") },
		{ label: "Create", href: resolve("/vs-instances/create") }
	];

	let versions: RAPIVSVersion[] = $state(untrack(() => data.versions));
	let versionsOpen: boolean = $state(false);
	let versionsTriggerRef: HTMLButtonElement = $state<HTMLButtonElement>(null!);

	let manuallySelectedDir: boolean = $state(false);

	let form: Form = $state({
		name: untrack(() => data.name),
		description: "",
		dir: untrack(() => data.dir),
		version: versions[0],
		backupsLimit: 3,
		backupsAuto: false,
		backupsCompressionLevel: 4,
		startParams: "",
		envVars: "",
		mesaGlThread: false
	});

	let debouncedName: Debounced<string> = new Debounced(() => form.name, 500);

	let errors: Errors = $state({
		name: [],
		description: [],
		dir: [],
		version: [],
		backupsLimit: [],
		backupsAuto: [],
		backupsCompressionLevel: [],
		startParams: [],
		envVars: [],
		mesaGlThread: []
	});

	const checkers: Checkers = {
		name: async (name: string): Promise<string[]> => {
			const errors: string[] = [];
			if (name.length < 5 || name.length > 50) errors.push("Name must be at least 5 characters long and a maximum of 50.");
			if (App.data.vsInstances.some((i) => i.name.toLowerCase() === name.toLowerCase())) errors.push("Name must be unique.");
			return errors;
		},
		description: async (description: string): Promise<string[]> => {
			const errors: string[] = [];
			if (description.length > 250) errors.push("Description must be a maximum of 250 characters.");
			return errors;
		},
		dir: async (dir: Directory): Promise<string[]> => {
			const errors: string[] = [];
			if (dir.path === App.config.vsInstancesDir.path) {
				errors.push("Directory must not be the same as the default Vintage Story Instances directory.");
			} else {
				const isDirEmpty = await dir.isEmpty();
				if (!isDirEmpty) errors.push("Directory must be empty.");
			}
			return errors;
		},
		version: async (): Promise<string[]> => {
			const errors: string[] = [];
			return errors;
		},
		backupsLimit: async (backupsLimit: number): Promise<string[]> => {
			const errors: string[] = [];
			if (backupsLimit < 1 || backupsLimit > 10) errors.push("Backups limit must be at least 1 and a maximum of 10.");
			return errors;
		},
		backupsAuto: async (): Promise<string[]> => {
			const errors: string[] = [];
			return errors;
		},
		backupsCompressionLevel: async (backupsCompressionLevel: number): Promise<string[]> => {
			const errors: string[] = [];
			if (backupsCompressionLevel < 0 || backupsCompressionLevel > 9) errors.push("Backups compression level must be at least 0 and a maximum of 9.");
			return errors;
		},
		startParams: async (): Promise<string[]> => {
			const errors: string[] = [];
			return errors;
		},
		envVars: async (): Promise<string[]> => {
			const errors: string[] = [];
			return errors;
		},
		mesaGlThread: async (): Promise<string[]> => {
			const errors: string[] = [];
			return errors;
		}
	};

	// When the name changes and, if the user haven't selected a directory manually,
	// set the new directory based on the new name.
	$effect(() => {
		let rerun = false;

		async function run() {
			if (!manuallySelectedDir) {
				const cleanName = cleanForPath(debouncedName.current);
				const path = await App.config.vsInstancesDir.join(cleanName);
				const dir = await Directory.create(path);
				if (!rerun) form.dir = dir;
			}
		}

		run();

		return () => (rerun = true);
	});

	/**
	 * Create a new Vintage Story Instance.
	 */
	async function handleCreation(): Promise<void> {
		const newErrors: Errors = {
			name: await checkers.name(form.name),
			description: await checkers.description(form.description),
			dir: await checkers.dir(form.dir),
			version: await checkers.version(form.version),
			backupsLimit: await checkers.backupsLimit(form.backupsLimit),
			backupsAuto: await checkers.backupsAuto(form.backupsAuto),
			backupsCompressionLevel: await checkers.backupsCompressionLevel(form.backupsCompressionLevel),
			startParams: await checkers.startParams(form.startParams),
			envVars: await checkers.envVars(form.envVars),
			mesaGlThread: await checkers.mesaGlThread(form.mesaGlThread)
		};

		if (!Object.values(newErrors).some((errors) => errors.length > 0)) {
			try {
				App.logger.info("Creating a new Vintage Story Instance...");

				const id = crypto.randomUUID();

				const dataPath = await form.dir.join("Data");
				const dataDir = await Directory.create(dataPath);

				const backupsPath = await form.dir.join("Backups");
				const backupsDir = await Directory.create(backupsPath);

				const filePath = await form.dir.join("instance.json");
				const file = await File.create(filePath);

				let version = App.data.vsVersions.find((v) => v.version === form.version.version);

				if (version === undefined) {
					const newVersionPath = await App.config.vsVersionsDir.join(form.version.version);
					const newVersionDir = await Directory.create(newVersionPath);
					const newVersion = await VSVersion.create({ version: form.version.version, dir: newVersionDir });

					await App.data.setVsVersions([...App.data.vsVersions, newVersion]);

					version = newVersion;

					App.logger.info(`Installing Vintage Story Version ${newVersion.version}...`);

					newVersion.install(form.version);
				}

				const vsInstance = await VSInstance.create({
					file,
					id,
					name: form.name,
					description: form.description,
					dir: form.dir,
					dataDir,
					backupsDir,
					version,
					startParams: form.startParams,
					backupsLimit: form.backupsLimit,
					backupsAuto: form.backupsAuto,
					backupsCompressionLevel: form.backupsCompressionLevel,
					lastTimePlayed: 0,
					totalTimePlayed: 0,
					envVars: form.envVars,
					mesaGlThread: form.mesaGlThread
				});

				vsInstance.install();

				await App.data.setVsInstances([...App.data.vsInstances, vsInstance]);

				App.logger.info("New Vintage Story Instance created successfully!");

				App.toaster.toast.success("New Vintage Story Instance created successfully!");

				goto(resolve(`/vs-instances/[slug]`, { slug: id }));
			} catch (err) {
				App.logger.error(`There was an error creating the new Vintage Story Instance:\n${err}`);
				App.toaster.toast.error("There was an error creating the new Vintage Story Instance! Contact support if the problem persists.");
			}
		} else {
			errors = newErrors;
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
					<Field.Field data-invalid={errors.name.length > 0}>
						<Field.Label for="name">Name</Field.Label>

						<Input
							bind:value={form.name}
							minlength={5}
							maxlength={50}
							id="name"
							placeholder="Choose a name..."
							aria-invalid={errors.name.length > 0}
						/>

						{#if errors.name.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each errors.name as error (error)}
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
					<Field.Field data-invalid={errors.version.length > 0}>
						<Field.Label for="vs-version">Vintage Story Version</Field.Label>

						<Popover.Root bind:open={versionsOpen}>
							<Popover.Trigger bind:ref={versionsTriggerRef}>
								{#snippet child({ props })}
									<Button
										{...props}
										id="vs-version"
										variant="outline"
										class="justify-between"
										role="combobox"
										aria-expanded={versionsOpen}
										aria-invalid={errors.version.length > 0}
									>
										{form.version.version || "Select a version..."}

										<IconSelector class="opacity-50" />
									</Button>
								{/snippet}
							</Popover.Trigger>

							<Popover.Content class="w-(--bits-floating-anchor-width) p-0">
								<Command.Root>
									<Command.Input placeholder="Select the VS Version..." />

									<Command.List>
										<Command.Empty>No Vintage Story Versions found.</Command.Empty>

										<Command.Group>
											{#each versions as version (version.version)}
												<Command.Item
													data-checked={version.version === form.version.version}
													value={version.version}
													onSelect={() => {
														form.version = version;

														versionsOpen = false;

														// Refocus the trigger button when the user selects an item so users can continue navigating the rest of the form with the keyboard.
														tick().then(() => {
															versionsTriggerRef.focus();
														});
													}}
													class="flex w-full justify-between"
												>
													{#if App.data.vsVersions.some((v) => v.version === version.version)}
														<IconCheck />
													{:else}
														<IconArrowDown />
													{/if}

													<span>{version.version}</span>
												</Command.Item>
											{/each}
										</Command.Group>
									</Command.List>
								</Command.Root>
							</Popover.Content>
						</Popover.Root>

						{#if errors.version.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each errors.version as error (error)}
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

				<!-- Description -->
				<Field.Field data-invalid={errors.description.length > 0}>
					<Field.Label for="description">Description</Field.Label>

					<Textarea
						bind:value={form.description}
						id="description"
						placeholder="Set a description..."
						maxlength={250}
						aria-invalid={errors.description.length > 0}
					/>

					{#if errors.description.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each errors.description as error (error)}
									<List.Item>
										{error}
									</List.Item>
								{/each}
							</List.Unordered>
						</Field.Error>
					{/if}

					<Field.Description>This is the description of the instance. It's optional and has a maximum of 250 characters.</Field.Description>
				</Field.Field>

				<!-- Path-->
				<Field.Field data-invalid={errors.dir.length > 0}>
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
									form.dir = await Directory.create(path);
								}
							}}
							aria-invalid={errors.dir.length > 0}
						>
							<IconFolder />
						</Button>

						<Input value={form.dir?.path || ""} placeholder="Select a directory..." readonly aria-invalid={errors.dir.length > 0} />
					</div>

					{#if errors.dir.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each errors.dir as error (error)}
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
					<Field.Field data-invalid={errors.backupsAuto.length > 0}>
						<Field.Label for="backups-auto">Automatic backups</Field.Label>

						<Switch id="backups-auto" bind:checked={form.backupsAuto} aria-invalid={errors.backupsAuto.length > 0} />

						{#if errors.backupsAuto.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each errors.backupsAuto as error (error)}
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
					<Field.Field data-invalid={errors.backupsLimit.length > 0}>
						<Field.Label for="backups-limit">Backups limit</Field.Label>

						<Slider
							type="single"
							id="backups-limit"
							min={1}
							max={10}
							step={1}
							bind:value={form.backupsLimit}
							aria-invalid={errors.backupsLimit.length > 0}
						/>

						{#if errors.backupsLimit.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each errors.backupsLimit as error (error)}
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
					<Field.Field class="lg:col-span-2 2xl:col-auto" data-invalid={errors.backupsCompressionLevel.length > 0}>
						<Field.Label for="backups-compression-level">Backups compression level</Field.Label>

						<Slider
							type="single"
							id="backups-compression-level"
							min={1}
							max={9}
							step={1}
							bind:value={form.backupsCompressionLevel}
							aria-invalid={errors.backupsCompressionLevel.length > 0}
						/>

						{#if errors.backupsCompressionLevel.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each errors.backupsCompressionLevel as error (error)}
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
				<Field.Field data-invalid={errors.startParams.length > 0}>
					<Field.Label for="start-params">Start params</Field.Label>

					<Input
						bind:value={form.startParams}
						id="start-params"
						placeholder="--param1=value1 --param2=value2..."
						aria-invalid={errors.startParams.length > 0}
					/>

					{#if errors.startParams.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each errors.startParams as error (error)}
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
				<Field.Field data-invalid={errors.envVars.length > 0}>
					<Field.Label for="env-vars">Start params</Field.Label>

					<Input bind:value={form.envVars} id="env-vars" placeholder="NEV1=value1,ENV2=value2..." aria-invalid={errors.envVars.length > 0} />

					{#if errors.envVars.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each errors.envVars as error (error)}
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
					<Field.Field data-invalid={errors.mesaGlThread.length > 0}>
						<Field.Label for="mesagl-thread">MesaGL Thread</Field.Label>

						<Switch id="mesagl-thread" bind:checked={form.mesaGlThread} aria-invalid={errors.mesaGlThread.length > 0} />

						{#if errors.mesaGlThread.length > 0}
							<Field.Error>
								<List.Unordered>
									{#each errors.mesaGlThread as error (error)}
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

		<Button onclick={() => handleCreation()}>Create</Button>
	</Field.Group>
</div>
