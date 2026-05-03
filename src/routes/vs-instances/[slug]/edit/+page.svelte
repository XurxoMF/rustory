<script lang="ts">
	import type { PageProps } from "./$types";

	import { tick } from "svelte";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconSelector from "@tabler/icons-svelte/icons/selector";
	import IconArrowDown from "@tabler/icons-svelte/icons/arrow-down";
	import IconCheck from "@tabler/icons-svelte/icons/check";

	import { App } from "$lib/classes/App.svelte";

	import { RAPIVSVersion } from "$lib/classes/api/RAPIVSVersion.svelte";

	import { Directory } from "$lib/classes/utils/Directory.svelte";

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

	const instance = $derived(data.instance);

	$effect(() => {
		App.breadcrumbs.segments = [
			{ label: "Vintage Story Instances", href: resolve("/vs-instances") },
			{ label: instance.name, href: resolve("/vs-instances/[slug]", { slug: instance.id }) },
			{ label: "Edit", href: resolve("/vs-instances/[slug]/edit", { slug: instance.id }) }
		];
	});

	let versions: RAPIVSVersion[] = $derived(data.versions);
	let versionsOpen: boolean = $state(false);
	let versionsTriggerRef: HTMLButtonElement = $state<HTMLButtonElement>(null!);

	let name: string = $derived(instance.name);
	let nameErrors: string[] = $state([]);

	let description: string = $derived(instance.description);
	let descriptionErrors: string[] = $state([]);

	let version: RAPIVSVersion = $derived(versions.find((v) => v.version === instance.version.version) ?? versions[0]);

	let backupsLimit: number = $derived(instance.backupsLimit);
	let backupsLimitErrors: string[] = $state([]);

	let backupsAuto: boolean = $derived(instance.backupsAuto);

	let backupsCompressionLevel: number = $derived(instance.backupsCompressionLevel);
	let backupsCompressionLevelErrors: string[] = $state([]);

	let startParams: string = $derived(instance.startParams);

	let envVars: string = $derived(instance.envVars);

	let mesaGlThread: boolean = $derived(instance.mesaGlThread);

	let totalErrors: number = $derived(nameErrors.length + descriptionErrors.length + backupsLimitErrors.length + backupsCompressionLevelErrors.length);

	/**
	 * Edit the Vintage Story Instance.
	 */
	async function handleEdit(): Promise<void> {
		const newNameErrors = await VSInstance.validateName(name);
		const newDescriptionErrors = await VSInstance.validateDescription(description);
		const newBackupsLimitErrors = await VSInstance.validateBackupsLimit(backupsLimit);
		const newBackupsCompressionLevelErrors = await VSInstance.validateBackupsCompressionLevel(backupsCompressionLevel);

		// Set them after checking everything so errors do not show one by one.
		nameErrors = newNameErrors;
		descriptionErrors = newDescriptionErrors;
		backupsLimitErrors = newBackupsLimitErrors;
		backupsCompressionLevelErrors = newBackupsCompressionLevelErrors;

		if (totalErrors === 0) {
			try {
				App.logger.info(`Editing the Vintage Story Instance ${instance.name} with id ${instance.id}...`);

				let localVersion = App.data.vsVersions.find((v) => v.version === version.version);

				if (localVersion === undefined) {
					const newVersionPath = await App.config.vsVersionsDir.join(version.version);
					const newVersionDir = await Directory.create(newVersionPath);
					const newVersion = await VSVersion.create({ version: version.version, dir: newVersionDir });

					await App.data.setVsVersions([...App.data.vsVersions, newVersion]);

					localVersion = newVersion;

					App.logger.info(`Installing Vintage Story Version ${newVersion.version}...`);

					newVersion.install(version);
				}

				instance.name = name;
				instance.description = description;
				instance.version = localVersion;
				instance.backupsLimit = backupsLimit;
				instance.backupsAuto = backupsAuto;
				instance.backupsCompressionLevel = backupsCompressionLevel;
				instance.startParams = startParams;
				instance.envVars = envVars;
				instance.mesaGlThread = mesaGlThread;

				instance.save();

				App.logger.info(`Vintage Story Instance ${instance.name} edited successfully!`);

				App.toaster.toast.success(`Vintage Story Instance ${instance.name} edited successfully!`);

				goto(resolve(`/vs-instances/[slug]`, { slug: instance.id }));
			} catch (err) {
				App.logger.error(`There was an error editing the Vintage Story Instance ${instance.name} with id ${instance.id}:\n${err}`);
				App.toaster.toast.error(`There was an error editing the Vintage Story Instance ${instance.name}! Contact support if the problem persists.`);
			}
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
					<Field.Field data-invalid={nameErrors.length > 0}>
						<Field.Label for="name">Name</Field.Label>

						<Input bind:value={name} minlength={5} maxlength={50} id="name" placeholder="Choose a name..." aria-invalid={nameErrors.length > 0} />

						{#if nameErrors.length > 0}
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
					<Field.Field>
						<Field.Label for="vs-version">Vintage Story Version</Field.Label>

						<Popover.Root bind:open={versionsOpen}>
							<Popover.Trigger bind:ref={versionsTriggerRef}>
								{#snippet child({ props })}
									<Button {...props} id="vs-version" variant="outline" class="justify-between" role="combobox" aria-expanded={versionsOpen}>
										{version.version || "Select a version..."}

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
											{#each versions as v (v.version)}
												<Command.Item
													data-checked={version.version === v.version}
													value={v.version}
													onSelect={() => {
														version = v;

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

													<span>{v.version}</span>
												</Command.Item>
											{/each}
										</Command.Group>
									</Command.List>
								</Command.Root>
							</Popover.Content>
						</Popover.Root>

						<Field.Description>The game version you select will be installed here.</Field.Description>
					</Field.Field>
				</div>

				<!-- Description -->
				<Field.Field data-invalid={descriptionErrors.length > 0}>
					<Field.Label for="description">Description</Field.Label>

					<Textarea
						bind:value={description}
						id="description"
						placeholder="Set a description..."
						maxlength={250}
						aria-invalid={descriptionErrors.length > 0}
					/>

					{#if descriptionErrors.length > 0}
						<Field.Error>
							<List.Unordered>
								{#each descriptionErrors as error (error)}
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
					<Field.Field>
						<Field.Label for="backups-auto">Automatic backups</Field.Label>

						<Switch id="backups-auto" bind:checked={backupsAuto} />

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
				<Field.Field>
					<Field.Label for="start-params">Start params</Field.Label>

					<Input bind:value={startParams} id="start-params" placeholder="--param1=value1 --param2=value2..." />

					<Field.Description>
						You can change how the game behaves adding this params. You can check the documentation on the Vintage Story Wiki.
					</Field.Description>
				</Field.Field>

				<!-- ENV Vars -->
				<Field.Field>
					<Field.Label for="env-vars">Start params</Field.Label>

					<Input bind:value={envVars} id="env-vars" placeholder="NEV1=value1,ENV2=value2..." />

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
					<Field.Field>
						<Field.Label for="mesagl-thread">MesaGL Thread</Field.Label>

						<Switch id="mesagl-thread" bind:checked={mesaGlThread} />

						<Field.Description>
							MesaGL Thread may improve performance on some Linux systems. Disable it if it causes issues for you.
						</Field.Description>
					</Field.Field>
				</Field.Group>
			</Field.Set>
		{/if}

		<Button onclick={() => handleEdit()}>Save</Button>
	</Field.Group>
</div>
