<script lang="ts" module>
	type Form = {
		name: { value: string; errors: string[] };
		description: { value: string; errors: string[] };
		rApiVersion: { value: RustoryApiVSVersion | undefined; errors: string[] };
		backupsLimit: { value: number; errors: string[] };
		backupsAuto: { value: boolean; errors: string[] };
		backupsCompressionLevel: { value: number; errors: string[] };
		startParams: { value: string; errors: string[] };
		envVars: { value: string; errors: string[] };
		mesaGlThread: { value: boolean; errors: string[] };
	};
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import { App } from "$lib/classes/App.svelte";

	import { Directory } from "$lib/classes/utils/Directory.svelte";

	import { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
	import { VSVersion } from "$lib/classes/vs/VSVersion.svelte";

	import { RustoryApiVSVersion } from "$lib/classes/api/RustoryApiVSVersion.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Button from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import * as Input from "$lib/components/ui/input";
	import * as Slider from "$lib/components/ui/slider";
	import * as Switch from "$lib/components/ui/switch";
	import * as List from "$lib/components/ui/list";
	import * as Combobox from "$lib/components/ui/combobox";
	import * as Textarea from "$lib/components/ui/textarea";

	let { params }: PageProps = $props();

	const rApiVersionsPromise: Promise<RustoryApiVSVersion[]> = RustoryApiVSVersion.fetchAll();

	const vsInstance: VSInstance | undefined = $derived(App.data.vsInstances.find((vsInstance) => vsInstance.id === params.slug));

	$effect(() => {
		if (vsInstance !== undefined) {
			App.breadcrumbs.segments = [
				{ label: "Vintage Story Instances", href: resolve("/vs-instances") },
				{ label: vsInstance.name, href: resolve("/vs-instances/[slug]", { slug: vsInstance.id }) },
				{ label: "Edit" }
			];
		} else {
			App.breadcrumbs.segments = [{ label: "Vintage Story Instances", href: resolve("/vs-instances") }, { label: "???" }, { label: "Edit" }];
		}
	});

	let form: Form = $state({
		name: { value: "", errors: [] },
		description: { value: "", errors: [] },
		rApiVersion: { value: undefined, errors: [] },
		backupsLimit: { value: 3, errors: [] },
		backupsAuto: { value: false, errors: [] },
		backupsCompressionLevel: { value: 4, errors: [] },
		startParams: { value: "", errors: [] },
		envVars: { value: "", errors: [] },
		mesaGlThread: { value: false, errors: [] }
	});

	$effect(() => {
		form.name.value = vsInstance?.name ?? "";
		form.description.value = vsInstance?.description ?? "";
		rApiVersionsPromise.then((rApiVersions) => (form.rApiVersion.value = rApiVersions.find((v) => v.version === vsInstance?.version) ?? undefined));
		form.backupsLimit.value = vsInstance?.backupsLimit ?? 3;
		form.backupsAuto.value = vsInstance?.backupsAuto ?? false;
		form.backupsCompressionLevel.value = vsInstance?.backupsCompressionLevel ?? 4;
		form.startParams.value = vsInstance?.startParams ?? "";
		form.envVars.value = vsInstance?.envVars ?? "";
		form.mesaGlThread.value = vsInstance?.mesaGlThread ?? false;
	});

	let totalErrors: number = $derived(
		Object.values(form)
			.entries()
			.reduce((total, [_, value]) => total + value.errors.length, 0)
	);

	/**
	 * Edit the Vintage Story Instance.
	 */
	async function handleEdit(): Promise<void> {
		if (vsInstance === undefined) {
			App.toaster.toast.error("The Vintage Story Instance does not exist and can't be edited!");
			return;
		}

		const nameErrors: string[] = [];
		const descriptionErrors: string[] = [];
		const rApiVersionErrors: string[] = [];
		const backupsLimitErrors: string[] = [];
		const backupsAutoErrors: string[] = [];
		const backupsCompressionLevelErrors: string[] = [];
		const startParamsErrors: string[] = [];
		const envVarsErrors: string[] = [];
		const mesaGlThreadErrors: string[] = [];

		// Check name
		if (form.name.value.length < 5 || form.name.value.length > 50) nameErrors.push("Name must be at least 5 characters long and a maximum of 50.");
		if (App.data.vsInstances.some((i) => i.id !== vsInstance.id && i.name.toLowerCase() === form.name.value.toLowerCase()))
			nameErrors.push("Name must be unique.");

		// Check description
		if (form.description.value.length > 250) descriptionErrors.push("Description must be a maximum of 250 characters.");

		// Check Rustory API vVrsion
		if (form.rApiVersion.value === undefined) rApiVersionErrors.push("A RustoryApi version must be selected.");

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
		form.rApiVersion.errors = rApiVersionErrors;
		form.backupsLimit.errors = backupsLimitErrors;
		form.backupsAuto.errors = backupsAutoErrors;
		form.backupsCompressionLevel.errors = backupsCompressionLevelErrors;
		form.startParams.errors = startParamsErrors;
		form.envVars.errors = envVarsErrors;
		form.mesaGlThread.errors = mesaGlThreadErrors;

		if (vsInstance === undefined) {
			App.toaster.toast.error("The Vintage Story Instance you are trying to edit does not exist!");
			return;
		}

		if (totalErrors === 0) {
			try {
				const rApiVersion = form.rApiVersion.value!;

				App.logger.info(`Editing the Vintage Story Instance ${vsInstance.name} with id ${vsInstance.id}...`);

				// If the selected version is not installed, install it.
				if (!App.data.vsVersions.some((v) => v.version === rApiVersion.version)) {
					const newVersionPath = await App.config.vsVersionsDir.join(rApiVersion.version);
					const newVersionDir = await Directory.create(newVersionPath);
					const newVersion = await VSVersion.create({ version: rApiVersion.version, dir: newVersionDir });

					await App.data.setVsVersions([...App.data.vsVersions, newVersion]);

					App.logger.info(`Installing Vintage Story Version ${newVersion.version}...`);

					newVersion.install(rApiVersion);
				}

				vsInstance.name = form.name.value;
				vsInstance.description = form.description.value;
				vsInstance.version = rApiVersion.version;
				vsInstance.backupsLimit = form.backupsLimit.value;
				vsInstance.backupsAuto = form.backupsAuto.value;
				vsInstance.backupsCompressionLevel = form.backupsCompressionLevel.value;
				vsInstance.startParams = form.startParams.value;
				vsInstance.envVars = form.envVars.value;
				vsInstance.mesaGlThread = form.mesaGlThread.value;

				await vsInstance.save();

				App.logger.info(`Vintage Story Instance ${vsInstance.name} edited successfully!`);

				App.toaster.toast.success(`Vintage Story Instance ${vsInstance.name} edited successfully!`);

				goto(resolve(`/vs-instances/[slug]`, { slug: vsInstance.id }));
			} catch (err) {
				App.logger.error(`There was an error editing the Vintage Story Instance ${vsInstance.name} with id ${vsInstance.id}: ${err}`);
				App.toaster.toast.error(`There was an error editing the Vintage Story Instance ${vsInstance.name}!`);
			}
		}
	}
</script>

<Typo.H1>{vsInstance ? `Edit ${vsInstance.name}` : "Not found"}</Typo.H1>
<Typo.Leading>Edit this Vintage Story Instance settings...</Typo.Leading>

{#if vsInstance === undefined}
	<Typo.P>This Vintage Story Instance does not exist!</Typo.P>
{:else}
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

						<Field.Description>MesaGL Thread may improve performance on some Linux systems. Disable it if it causes issues for you.</Field.Description
						>
					</Field.Field>
				</Field.Group>
			</Field.Set>
		{/if}

		<Button.Root onclick={() => handleEdit()}>Edit</Button.Root>
	</Field.Group>
{/if}
