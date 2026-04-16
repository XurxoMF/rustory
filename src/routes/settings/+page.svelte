<script lang="ts">
	import { open } from "@tauri-apps/plugin-dialog";

	import IconFolder from "@tabler/icons-svelte/icons/folder";

	import { App } from "$lib/classes/App.svelte";
	import { Config } from "$lib/classes/app/Config.svelte";
	import { Directory } from "$lib/classes/utils/Directory.svelte";

	import { H1, Leading } from "$lib/components/ui/typography";
	import * as Select from "$lib/components/ui/select";
	import { Slider } from "$lib/components/ui/slider";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";

	App.breadcrumbs.segments = [{ label: "Settings", href: "/settings" }];
</script>

<H1>Settings</H1>
<Leading>Customize the app.</Leading>

<div class="mt-6">
	<Field.Group>
		<Field.Set>
			<Field.Legend>UI settings</Field.Legend>
			<Field.Description>Customize the UI.</Field.Description>

			<Field.Group>
				<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<!-- Theme -->
					<Field.Field>
						<Field.Label for="theme">Theme</Field.Label>

						<Select.Root
							type="single"
							value={App.config.theme}
							onValueChange={(value) => App.config.setTheme(value as (typeof Config.THEMES)[number]["key"])}
						>
							<Select.Trigger id="theme">{Config.THEMES.find(({ key }) => key === App.config.theme)?.name || "Theme"}</Select.Trigger>

							<Select.Content>
								<Select.Group>
									{#each Config.THEMES as { key, name } (key)}
										<Select.Item value={key}>{name}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>

						<Field.Description>Change the theme of the app.</Field.Description>
					</Field.Field>

					<!-- Locale -->
					<Field.Field>
						<Field.Label for="locale">Locale</Field.Label>

						<Select.Root
							type="single"
							value={App.config.locale}
							onValueChange={(value) => App.config.setLocale(value as (typeof Config.LOCALES)[number]["key"])}
						>
							<Select.Trigger id="locale">{Config.LOCALES.find(({ key }) => key === App.config.locale)?.name || "Locale"}</Select.Trigger>

							<Select.Content>
								<Select.Group>
									{#each Config.LOCALES as { key, name } (key)}
										<Select.Item value={key}>{name}</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>

						<Field.Description>Change the theme of the app.</Field.Description>
					</Field.Field>
				</div>

				<!-- Scale -->
				<Field.Field>
					<Field.Label for="scale">Scale</Field.Label>

					<Slider
						type="single"
						id="scale"
						min={0.5}
						max={1.5}
						step={0.1}
						value={App.config.scale}
						onValueCommit={(value) => {
							if (value !== App.config.scale) App.config.setScale(value);
						}}
					/>

					<Field.Description>Change the scale of the UI.</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>

		<Field.Separator />

		<Field.Set>
			<Field.Legend>Vintage Story settings</Field.Legend>
			<Field.Description>Customize the Vintage Story related settings.</Field.Description>

			<Field.Group>
				<!-- Vintage Story Isntances directory -->
				<Field.Field>
					<Field.Label for="vs-instances-dir">VS Instances Directory</Field.Label>

					<div class="flex gap-2">
						<Button
							id="vs-instances-dir"
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
									const dir = await Directory.create(path);

									App.config.setVSInstancesDir(dir);
								}
							}}
						>
							<IconFolder />
						</Button>

						<Input value={App.config.vsInstancesDir.path} readonly />
					</div>

					<Field.Description>Directory where Vintage Story Instances will be stored.</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>
	</Field.Group>
</div>
