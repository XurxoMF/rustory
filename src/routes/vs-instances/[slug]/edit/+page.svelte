<script lang="ts" module>
	type Form = {
		name: string;
		description: string;
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
	import type { PageProps } from "./$types";

	import { tick, untrack } from "svelte";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconSelector from "@tabler/icons-svelte/icons/selector";
	import IconArrowDown from "@tabler/icons-svelte/icons/arrow-down";
	import IconCheck from "@tabler/icons-svelte/icons/check";

	import { App } from "$lib/classes/App.svelte";

	import { RAPIVSVersion } from "$lib/classes/api/RAPIVSVersion.svelte";

	import { Directory } from "$lib/classes/utils/Directory.svelte";

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

	const instance = untrack(() => data.instance);

	App.breadcrumbs.segments = [
		{ label: "Vintage Story Instances", href: resolve("/vs-instances") },
		{ label: instance.name, href: resolve("/vs-instances/[slug]", { slug: instance.id }) },
		{ label: "Edit", href: resolve("/vs-instances/[slug]/edit", { slug: instance.id }) }
	];

	let versions: RAPIVSVersion[] = $state(untrack(() => data.versions));
	let versionsOpen: boolean = $state(false);
	let versionsTriggerRef: HTMLButtonElement = $state<HTMLButtonElement>(null!);

	let form: Form = $state({
		name: instance.name,
		description: instance.description,
		version: versions.find((v) => v.version === instance.version.version) || versions[0],
		backupsLimit: instance.backupsLimit,
		backupsAuto: instance.backupsAuto,
		backupsCompressionLevel: instance.backupsCompressionLevel,
		startParams: instance.startParams,
		envVars: instance.envVars,
		mesaGlThread: instance.mesaGlThread
	});

	let errors: Errors = $state({
		name: [],
		description: [],
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

	/**
	 * Edit the Vintage Story Instance.
	 */
	async function handleEdit(): Promise<void> {
		const newErrors: Errors = {
			name: await checkers.name(form.name),
			description: await checkers.description(form.description),
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
				App.logger.info(`Editing the Vintage Story Instance ${instance.name} with id ${instance.id}...`);

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

				instance.name = form.name;
				instance.description = form.description;
				instance.version = version;
				instance.backupsLimit = form.backupsLimit;
				instance.backupsAuto = form.backupsAuto;
				instance.backupsCompressionLevel = form.backupsCompressionLevel;
				instance.startParams = form.startParams;
				instance.envVars = form.envVars;
				instance.mesaGlThread = form.mesaGlThread;

				App.logger.info(`Vintage Story Instance ${instance.name} edited successfully!`);

				App.toaster.toast.success(`Vintage Story Instance ${instance.name} edited successfully!`);

				goto(resolve(`/vs-instances/[slug]`, { slug: instance.id }));
			} catch (err) {
				App.logger.error(`There was an error editing the Vintage Story Instance ${instance.name} with id ${instance.id}:\n${err}`);
				App.toaster.toast.error(`There was an error editing the Vintage Story Instance ${instance.name}! Contact support if the problem persists.`);
			}
		} else {
			errors = newErrors;
		}
	}
</script>

<H1>Edit {instance.name}</H1>
<Leading>Edit this Vintage Story Instance.</Leading>

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

						<Input bind:value={form.name} id="name" placeholder="Choose a name..." aria-invalid={errors.name.length > 0} />

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

		<Button onclick={() => handleEdit()}>Edit</Button>
	</Field.Group>
</div>
