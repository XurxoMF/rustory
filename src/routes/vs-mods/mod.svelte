<script lang="ts" module>
	export type ModProps = {
		layout: Layout;
		modDBApiBasicMod: ModDBApiBasicMod;
		vsInstance?: VSInstance | undefined;
	};
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconDots from "@tabler/icons-svelte/icons/dots";

	import { Confirm } from "$lib/classes/stores/Confirm.svelte";
	import { Data } from "$lib/classes/stores/Data.svelte";
	import { Info } from "$lib/classes/stores/Info.svelte";
	import { Logger } from "$lib/classes/utils/Logger.svelte";
	import { Toaster } from "$lib/classes/utils/Toaster.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import type { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import { findCompatibleRelease, getMajorMinorVersion } from "$lib/helpers/Versions";

	import * as Card from "$lib/components/ui/card";
	import * as Item from "$lib/components/ui/item";
	import * as Badge from "$lib/components/ui/badge";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import * as Table from "$lib/components/ui/table";
	import * as Button from "$lib/components/ui/button";
	import * as ButtonGroup from "$lib/components/ui/button-group";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

	import { type Layout } from "./filters.svelte";

	let { layout, modDBApiBasicMod, vsInstance }: ModProps = $props();

	/**
	 * Handles the installation of a mod on a Vintage Story instance.
	 */
	async function handleModInstall(instance: VSInstance | undefined): Promise<void> {
		try {
			Logger.info(`Installing mod ${modDBApiBasicMod.name}...`);

			if (instance === undefined) {
				Toaster.toast.error("No Instance selected!", { description: "You need to select a Vintage Story Instance to install mods." });
				return;
			}

			const modDBApiMod = await modDBApiBasicMod.toModDBApiMod();

			if (modDBApiMod === undefined) {
				Toaster.toast.error("No mod found!", { description: "The mod you're trying to install could not be found." });
				return;
			}

			if (modDBApiMod.releases.length === 0) {
				Toaster.toast.error("No releases found!", { description: "The mod you're trying to install has no releases." });
				return;
			}

			const compatibleRelease = findCompatibleRelease(modDBApiMod.releases, instance.version);

			if (compatibleRelease?.type === "exact") {
				await instance.installMod(modDBApiMod, compatibleRelease.release);

				Logger.info(`Mod ${modDBApiMod.name} installed successfully on the Vintage Story Instance ${instance.name}!`);

				Toaster.toast.success("Mod installed successfully!", {
					description: `The mod ${modDBApiMod.name} has been installed successfully on the Vintage Story Instance ${instance.name}!`
				});

				return;
			}

			const minorInstanceVersion = getMajorMinorVersion(instance.version) ?? instance.version;

			if (compatibleRelease?.type === "minor") {
				const question = await Confirm.instance.ask({
					title: "Partial match found!",
					description: `The mod ${modDBApiMod.name} has a release for the Vintage Story Version ${minorInstanceVersion}.X but not for the exact Vintage Story Version ${instance.version} . Do you want to install it anyway?`,
					mode: "default"
				});

				if (question) {
					await instance.installMod(modDBApiMod, compatibleRelease.release);

					Logger.info(`Mod ${modDBApiMod.name} installed successfully on the Vintage Story Instance ${instance.name}!`);

					Toaster.toast.success("Mod installed successfully!", {
						description: `The mod ${modDBApiMod.name} has been installed successfully on the Vintage Story Instance ${instance.name}!`
					});

					return;
				} else {
					Logger.info(`Mod ${modDBApiMod.name} not installed on the Vintage Story Instance ${instance.name} because the user refused!`);

					Toaster.toast.warning("Mod not installed!", {
						description: `The mod ${modDBApiMod.name} has not been installed on the Vintage Story Instance ${instance.name} because you decided so!`
					});

					return;
				}
			}

			Logger.error(`Mod ${modDBApiMod.name} has no release that matches the Vintage Story Version ${instance.version}!`);

			Toaster.toast.error("No matching release found!", {
				description: `The mod ${modDBApiMod.name} has no release that matches the Vintage Story Version ${instance.version}! You can open the mod's page and install the version you want manually!`
			});
		} catch (err) {
			Logger.error(`Something went wrong while installing the ModDB API Mod with ID ${modDBApiBasicMod.modid} and couldn't be installed: ${err}`);
			Toaster.toast.error("Something went wrong!", {
				description: `Something went wrong while installing the mod ${modDBApiBasicMod.name} and couldn't be installed!`
			});
		}
	}
</script>

{#if layout === "grid"}
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-lg">{modDBApiBasicMod.name}</Card.Title>

			<Card.Description class="line-clamp-2">{modDBApiBasicMod.summary}</Card.Description>

			<Card.Action>
				<Badge.Root variant="outline">{modDBApiBasicMod.side}</Badge.Root>
			</Card.Action>
		</Card.Header>

		<Card.Content class="mt-auto">
			<AspectRatio.Root ratio={3 / 2} class="overflow-hidden rounded-lg">
				<img src={modDBApiBasicMod.logo} alt={`${modDBApiBasicMod.name} logo`} />
			</AspectRatio.Root>

			<Table.Root class="mt-4">
				<Table.Body>
					<Table.Row>
						<Table.Cell class="text-muted-foreground" align="left">Author</Table.Cell>
						<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.author}</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell class="text-muted-foreground" align="left">Follows</Table.Cell>
						<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.follows}</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell class="text-muted-foreground" align="left">Downloads</Table.Cell>
						<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.downloads}</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell class="text-muted-foreground" align="left">Comments</Table.Cell>
						<Table.Cell class="font-bold" align="right">{modDBApiBasicMod.comments}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</Card.Content>

		<Card.Footer class="flex justify-end gap-2">
			<Button.Root class="flex-1" variant="outline" onclick={() => goto(resolve("/vs-mods/[slug]", { slug: modDBApiBasicMod.modid.toString() }))}>
				View
			</Button.Root>

			<ButtonGroup.Root class="flex-1">
				<Button.Root
					class="flex-1"
					variant="default"
					disabled={!Info.instance.isOnline ||
						vsInstance === undefined ||
						vsInstance.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid))}
					onclick={() => handleModInstall(vsInstance)}
				>
					{vsInstance?.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid)) ? "Installed" : "Install"}
				</Button.Root>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger disabled={Data.instance.vsInstances.length < 1}>
						{#snippet child({ props })}
							<Button.Root {...props} variant="default" size="icon">
								<IconDots />
							</Button.Root>
						{/snippet}
					</DropdownMenu.Trigger>

					<DropdownMenu.Content align="end">
						<DropdownMenu.Group>
							{#each Data.instance.vsInstances as vsi (vsi.id)}
								<DropdownMenu.Item
									disabled={vsi.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid))}
									onSelect={() => handleModInstall(vsi)}
								>
									{vsi.name}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</ButtonGroup.Root>
		</Card.Footer>
	</Card.Root>
{:else}
	<Item.Root variant="outline">
		<Item.Media variant="image">
			<AspectRatio.Root ratio={3 / 3} class="overflow-hidden rounded-lg">
				<img src={modDBApiBasicMod.logo} alt={`${modDBApiBasicMod.name} logo`} />
			</AspectRatio.Root>
		</Item.Media>

		<Item.Content>
			<Item.Title class="line-clamp-1">
				{modDBApiBasicMod.name} -
				<span class="text-muted-foreground">{modDBApiBasicMod.author}</span>
			</Item.Title>

			<Item.Description>
				Follows: {modDBApiBasicMod.follows} · Downloads: {modDBApiBasicMod.downloads} · Comments: {modDBApiBasicMod.comments}
			</Item.Description>
		</Item.Content>

		<Item.Actions>
			<Button.Root variant="outline" size="sm" onclick={() => goto(resolve("/vs-mods/[slug]", { slug: modDBApiBasicMod.modid.toString() }))}>
				View
			</Button.Root>

			<ButtonGroup.Root>
				<Button.Root
					variant="default"
					disabled={!Info.instance.isOnline ||
						vsInstance === undefined ||
						vsInstance.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid))}
					onclick={() => handleModInstall(vsInstance)}
				>
					{vsInstance?.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid)) ? "Installed" : "Install"}
				</Button.Root>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger disabled={Data.instance.vsInstances.length < 1}>
						{#snippet child({ props })}
							<Button.Root {...props} variant="default" size="icon">
								<IconDots />
							</Button.Root>
						{/snippet}
					</DropdownMenu.Trigger>

					<DropdownMenu.Content align="end">
						<DropdownMenu.Group>
							{#each Data.instance.vsInstances as vsi (vsi.id)}
								<DropdownMenu.Item
									disabled={vsi.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid))}
									onSelect={() => handleModInstall(vsi)}
								>
									{vsi.name}
								</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</ButtonGroup.Root>
		</Item.Actions>
	</Item.Root>
{/if}
