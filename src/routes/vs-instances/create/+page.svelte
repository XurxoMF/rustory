<script lang="ts" module>
	type Form = {
		name: { value: string; errors: string[] };
		description: { value: string; errors: string[] };
		dir: { value: Directory | undefined; errors: string[] };
		rApiVersion: { value: RAPIVSVersion | undefined; errors: string[] };
		backupsLimit: { value: number; errors: string[] };
		backupsAuto: { value: boolean; errors: string[] };
		backupsCompressionLevel: { value: number; errors: string[] };
		startParams: { value: string; errors: string[] };
		envVars: { value: string; errors: string[] };
		mesaGlThread: { value: boolean; errors: string[] };
	};
</script>

<script lang="ts">
	import { Debounced } from "runed";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import { open } from "@tauri-apps/plugin-dialog";

	import IconFolder from "@tabler/icons-svelte/icons/folder";

	import { cleanForPath } from "$lib/utils";

	import { App } from "$lib/classes/App.svelte";

	import { PageLoadError, PageLoadErrorCodes } from "$lib/classes/errors/PageLoadError.svelte";

	import { Directory } from "$lib/classes/utils/Directory.svelte";
	import { File } from "$lib/classes/utils/File.svelte";

	import { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
	import { VSVersion } from "$lib/classes/vs/VSVersion.svelte";

	import { RAPIVSVersion, type RAPIVSVersionJSON } from "$lib/classes/api/RAPIVSVersion.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Button from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import * as Input from "$lib/components/ui/input";
	import * as Slider from "$lib/components/ui/slider";
	import * as Switch from "$lib/components/ui/switch";
	import * as List from "$lib/components/ui/list";
	import * as Combobox from "$lib/components/ui/combobox";
	import * as Textarea from "$lib/components/ui/textarea";

	const rApiVersionsPromise: Promise<RAPIVSVersion[]> = loadRApiVersions();

	App.breadcrumbs.segments = [{ label: "Vintage Story Instances", href: resolve("/vs-instances") }, { label: "Create" }];

	let manuallySelectedDir: boolean = $state(false);

	let form: Form = $state({
		name: { value: `Instance ${App.data.vsInstances.length + 1}`, errors: [] },
		description: { value: "", errors: [] },
		dir: { value: undefined, errors: [] },
		rApiVersion: { value: undefined, errors: [] },
		backupsLimit: { value: 3, errors: [] },
		backupsAuto: { value: false, errors: [] },
		backupsCompressionLevel: { value: 4, errors: [] },
		startParams: { value: "", errors: [] },
		envVars: { value: "", errors: [] },
		mesaGlThread: { value: false, errors: [] }
	});

	let debouncedName: Debounced<string> = new Debounced(() => form.name.value, 500);

	let totalErrors: number = $derived(
		Object.values(form)
			.entries()
			.reduce((total, [_, value]) => total + value.errors.length, 0)
	);

	// When the name changes and, if the user haven't selected a directory manually,
	// set the new directory based on the new name.
	$effect(() => {
		(async () => {
			if (!manuallySelectedDir) {
				const cleanName = cleanForPath(debouncedName.current);
				const path = await App.config.vsInstancesDir.join(cleanName);
				form.dir.value = await Directory.create(path);
			}
		})();
	});

	/**
	 * Create a new Vintage Story Instance.
	 */
	async function handleCreation(): Promise<void> {
		const nameErrors: string[] = [];
		const descriptionErrors: string[] = [];
		const dirErrors: string[] = [];
		const rApiVersionErrors: string[] = [];
		const backupsLimitErrors: string[] = [];
		const backupsAutoErrors: string[] = [];
		const backupsCompressionLevelErrors: string[] = [];
		const startParamsErrors: string[] = [];
		const envVarsErrors: string[] = [];
		const mesaGlThreadErrors: string[] = [];

		// Check name
		if (form.name.value.length < 5 || form.name.value.length > 50) nameErrors.push("Name must be at least 5 characters long and a maximum of 50.");
		if (App.data.vsInstances.some((i) => i.name.toLowerCase() === form.name.value.toLowerCase())) nameErrors.push("Name must be unique.");

		// Check description
		if (form.description.value.length > 250) descriptionErrors.push("Description must be a maximum of 250 characters.");

		// Check directory
		if (form.dir.value === undefined) {
			dirErrors.push("A directory must be selected.");
		} else if (form.dir.value.path === App.config.vsInstancesDir.path) {
			dirErrors.push("Directory must not be the same as the default Vintage Story Instances directory.");
		} else {
			const isDirEmpty = await form.dir.value.isEmpty();
			if (!isDirEmpty) dirErrors.push("Directory must be empty.");
		}

		// Check Rustory API vVrsion
		if (form.rApiVersion.value === undefined) rApiVersionErrors.push("A RAPI version must be selected.");

		// Check backups limit
		if (form.backupsLimit.value < 1 || form.backupsLimit.value > 10) backupsLimitErrors.push("Backups limit must be at least 1 and a maximum of 10.");

		// Check backups auto
		if (form.backupsAuto.value && form.backupsLimit.value < 1)
			backupsAutoErrors.push("Backups auto can't be enabled if when backups limit is less than 1.");

		// Check backups compression level
		if (form.backupsCompressionLevel.value < 0 || form.backupsCompressionLevel.value > 9)
			backupsCompressionLevelErrors.push("Backups compression level must be at least 0 and a maximum of 9.");

		// Check env vars
		if (form.envVars.value.length > 0 && !form.envVars.value.match(/^[a-zA-Z0-9_]+=[a-zA-Z0-9_]+(,[a-zA-Z0-9_]+=[a-zA-Z0-9_]+)*$/))
			envVarsErrors.push("Env vars must be a comma separated list of key=value pairs.");

		// Set them after checking everything so errors do not show one by one.
		form.name.errors = nameErrors;
		form.description.errors = descriptionErrors;
		form.dir.errors = dirErrors;
		form.rApiVersion.errors = rApiVersionErrors;
		form.backupsLimit.errors = backupsLimitErrors;
		form.backupsAuto.errors = backupsAutoErrors;
		form.backupsCompressionLevel.errors = backupsCompressionLevelErrors;
		form.startParams.errors = startParamsErrors;
		form.envVars.errors = envVarsErrors;
		form.mesaGlThread.errors = mesaGlThreadErrors;

		if (totalErrors === 0) {
			try {
				const dir = form.dir.value!;
				const rApiVersion = form.rApiVersion.value!;

				App.logger.info("Creating a new Vintage Story Instance...");

				const id = crypto.randomUUID();

				const dataPath = await dir.join("Data");
				const dataDir = await Directory.create(dataPath);

				const backupsPath = await dir.join("Backups");
				const backupsDir = await Directory.create(backupsPath);

				const modsPath = await dataDir.join("Mods");
				const modsDir = await Directory.create(modsPath);

				const filePath = await dir.join("instance.json");
				const file = await File.create(filePath);

				const isRApiVersionInstalled = App.data.vsVersions.some((v) => v.version === rApiVersion.version);

				// If the selected version is not installed, install it.
				if (!isRApiVersionInstalled) {
					const newVersionPath = await App.config.vsVersionsDir.join(rApiVersion.version);
					const newVersionDir = await Directory.create(newVersionPath);
					const newVersion = await VSVersion.create({ version: rApiVersion.version, dir: newVersionDir });

					await App.data.setVsVersions([...App.data.vsVersions, newVersion]);

					App.logger.info(`Installing Vintage Story Version ${newVersion.version}...`);

					newVersion.install(rApiVersion!);
				}

				const vsInstance = await VSInstance.create({
					file,
					id,
					name: form.name.value,
					description: form.description.value,
					dir: dir,
					dataDir,
					backupsDir,
					modsDir,
					version: rApiVersion!.version,
					startParams: form.startParams.value,
					backupsLimit: form.backupsLimit.value,
					backupsAuto: form.backupsAuto.value,
					backupsCompressionLevel: form.backupsCompressionLevel.value,
					lastTimePlayed: 0,
					totalTimePlayed: 0,
					envVars: form.envVars.value,
					mesaGlThread: form.mesaGlThread.value
				});

				await vsInstance.save();

				await App.data.setVsInstances([...App.data.vsInstances, vsInstance]);

				App.logger.info("New Vintage Story Instance created successfully!");

				App.toaster.toast.success("New Vintage Story Instance created successfully!");

				goto(resolve(`/vs-instances/[slug]`, { slug: id }));
			} catch (err) {
				App.logger.error(`There was an error creating the new Vintage Story Instance:\n${err}`);
				App.toaster.toast.error("There was an error creating the new Vintage Story Instance!");
			}
		}
	}

	/**
	 * Loads the Rustory API Versions.
	 */
	async function loadRApiVersions(): Promise<RAPIVSVersion[]> {
		try {
			const resRApiVersions: Response = await App.request.get("https://api.rustory.xyz/versions");
			const jsonRApiVersions: RAPIVSVersionJSON[] = await resRApiVersions.json();
			const rApiVersions = jsonRApiVersions.map((v) => new RAPIVSVersion({ ...v }));

			return rApiVersions;
		} catch (err) {
			App.logger.error(`There was an error loading the page data:\n${err}`);
			throw new PageLoadError(PageLoadErrorCodes.GENERIC_ERROR, "There was an error loading the page data!");
		}
	}
</script>

<Typo.H1>Create Vintage Story Instance</Typo.H1>
<Typo.Leading>Create a new Vintage Story Instance with new mods, settings, worlds...</Typo.Leading>

<Field.Group>
	<Field.Set>
		<Field.Legend>General</Field.Legend>
		<Field.Description>General settings.</Field.Description>

		<Field.Group>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<!-- Name-->
				<Field.Field data-invalid={form.name.errors.length > 0}>
					<Field.Label for="name">Name</Field.Label>

					<Input.Root
						bind:value={form.name.value}
						minlength={5}
						maxlength={50}
						id="name"
						placeholder="Choose a name..."
						aria-invalid={form.name.errors.length > 0}
					/>

					{#if form.name.errors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each form.name.errors as error (error)}
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
				<Field.Field data-invalid={form.rApiVersion.errors.length > 0}>
					<Field.Label for="vs-version">Vintage Story Version</Field.Label>

					{#await rApiVersionsPromise}
						<Button.Skeleton />
					{:then rApiVersions}
						<Combobox.Root
							value={form.rApiVersion.value?.version}
							onchange={(v) => (form.rApiVersion.value = rApiVersions.find((vs) => vs.version === v))}
						>
							<Combobox.Trigger>{form.rApiVersion.value?.version || "Select a version..."}</Combobox.Trigger>

							<Combobox.Content>
								<Combobox.Input placeholder="Buscar..." />

								<Combobox.List>
									<Combobox.Empty>No Vintage Story Versions found.</Combobox.Empty>

									<Combobox.Group>
										{#each rApiVersions as v (v.version)}
											<Combobox.Item value={v.version}>{v.version}</Combobox.Item>
										{/each}
									</Combobox.Group>
								</Combobox.List>
							</Combobox.Content>
						</Combobox.Root>
					{/await}

					{#if form.rApiVersion.errors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each form.rApiVersion.errors as error (error)}
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
			<Field.Field data-invalid={form.description.errors.length > 0}>
				<Field.Label for="description">Description</Field.Label>

				<Textarea.Root
					bind:value={form.description.value}
					id="description"
					placeholder="Set a description..."
					maxlength={250}
					aria-invalid={form.description.errors.length > 0}
				/>

				{#if form.description.errors.length > 0}
					<Field.Error>
						<List.Unordered>
							{#each form.description.errors as error (error)}
								<List.Item>
									{error}
								</List.Item>
							{/each}
						</List.Unordered>
					</Field.Error>
				{/if}

				<Field.Description>This is the description of the instance. It's optional and has a maximum of 250 characters.</Field.Description>
			</Field.Field>

			<!-- Directory-->
			<Field.Field data-invalid={form.dir.errors.length > 0}>
				<Field.Label for="directory">Directory</Field.Label>

				<div class="flex gap-2">
					<Button.Root
						id="directory"
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
								form.dir.value = await Directory.create(path);
							}
						}}
						aria-invalid={form.dir.errors.length > 0}
					>
						<IconFolder />
					</Button.Root>

					<Input.Root value={form.dir.value?.path || ""} placeholder="Select a directory..." readonly aria-invalid={form.dir.errors.length > 0} />
				</div>

				{#if form.dir.errors.length > 0}
					<Field.Error>
						<List.Unordered>
							{#each form.dir.errors as error (error)}
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
				<Field.Field data-invalid={form.backupsAuto.errors.length > 0}>
					<Field.Label for="backups-auto">Automatic backups</Field.Label>

					<Switch.Root id="backups-auto" bind:checked={form.backupsAuto.value} aria-invalid={form.backupsAuto.errors.length > 0} />

					{#if form.backupsAuto.errors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each form.backupsAuto.errors as error (error)}
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
				<Field.Field data-invalid={form.backupsLimit.errors.length > 0}>
					<Field.Label for="backups-limit">Backups limit</Field.Label>

					<Slider.Root
						type="single"
						id="backups-limit"
						min={1}
						max={10}
						step={1}
						bind:value={form.backupsLimit.value}
						aria-invalid={form.backupsLimit.errors.length > 0}
					/>

					{#if form.backupsLimit.errors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each form.backupsLimit.errors as error (error)}
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
				<Field.Field class="lg:col-span-2 2xl:col-auto" data-invalid={form.backupsCompressionLevel.errors.length > 0}>
					<Field.Label for="backups-compression-level">Backups compression level</Field.Label>

					<Slider.Root
						type="single"
						id="backups-compression-level"
						min={1}
						max={9}
						step={1}
						bind:value={form.backupsCompressionLevel.value}
						aria-invalid={form.backupsCompressionLevel.errors.length > 0}
					/>

					{#if form.backupsCompressionLevel.errors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each form.backupsCompressionLevel.errors as error (error)}
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
			<Field.Field data-invalid={form.startParams.errors.length > 0}>
				<Field.Label for="start-params">Start params</Field.Label>

				<Input.Root
					bind:value={form.startParams.value}
					id="start-params"
					placeholder="--param1=value1 --param2=value2..."
					aria-invalid={form.startParams.errors.length > 0}
				/>

				{#if form.startParams.errors.length > 0}
					<Field.Error>
						<List.Unordered>
							{#each form.startParams.errors as error (error)}
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
			<Field.Field data-invalid={form.envVars.errors.length > 0}>
				<Field.Label for="env-vars">Start params</Field.Label>

				<Input.Root
					bind:value={form.envVars.value}
					id="env-vars"
					placeholder="NEV1=value1,ENV2=value2..."
					aria-invalid={form.envVars.errors.length > 0}
				/>

				{#if form.envVars.errors.length > 0}
					<Field.Error>
						<List.Unordered>
							{#each form.envVars.errors as error (error)}
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
				<Field.Field data-invalid={form.mesaGlThread.errors.length > 0}>
					<Field.Label for="mesagl-thread">MesaGL Thread</Field.Label>

					<Switch.Root id="mesagl-thread" bind:checked={form.mesaGlThread.value} aria-invalid={form.mesaGlThread.errors.length > 0} />

					{#if form.mesaGlThread.errors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each form.mesaGlThread.errors as error (error)}
									<List.Item>
										{error}
									</List.Item>
								{/each}
							</List.Unordered>
						</Field.Error>
					{/if}

					<Field.Description>MesaGL Thread may improve performance on some Linux systems. Disable it if it causes issues for you.</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>
	{/if}

	<Button.Root onclick={() => handleCreation()}>Create</Button.Root>
</Field.Group>
