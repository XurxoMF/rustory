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

	import { App } from "$lib/classes/App.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import type { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import * as Card from "$lib/components/ui/card";
	import * as Item from "$lib/components/ui/item";
	import * as Badge from "$lib/components/ui/badge";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import * as Table from "$lib/components/ui/table";
	import * as Button from "$lib/components/ui/button";

	import { type Layout } from "./filters.svelte";

	let { layout, modDBApiBasicMod, vsInstance }: ModProps = $props();

	/**
	 * Handles the installation of a mod on the selected Vintage Story Instance.
	 */
	async function handleModInstall() {
		try {
			if (vsInstance === undefined) {
				App.toaster.toast.error("No Instance selected!", { description: "You need to select a Vintage Story Instance to install mods." });
				return;
			}

			const modDBApiMod = await modDBApiBasicMod.toModDBApiMod();

			if (modDBApiMod === undefined) {
				App.toaster.toast.error("No mod found!", { description: "The mod you're trying to install could not be found." });
				return;
			}

			const releases = modDBApiMod.releases;

			if (releases.length === 0) {
				App.toaster.toast.error("No releases found!", { description: "The mod you're trying to install has no releases." });
				return;
			}

			const release = releases[0];

			vsInstance.installMod(modDBApiMod, release);

			App.toaster.toast.success("Mod installed successfully!", {
				description: `The mod ${modDBApiMod.name} has been installed successfully!`
			});
		} catch (err) {
			App.logger.error(`Something went wrong while installing the ModDB API Mod with ID ${modDBApiBasicMod.modid} and couldn't be installed: ${err}`);
			App.toaster.toast.error("Something went wrong!", {
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

			<Button.Root
				class="flex-1"
				variant="default"
				disabled={!App.info.isOnline || vsInstance === undefined || vsInstance.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid))}
				onclick={handleModInstall}
			>
				{vsInstance?.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid)) ? "Installed" : "Install"}
			</Button.Root>
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
			<Button.Root
				class="flex-1"
				variant="outline"
				size="sm"
				onclick={() => goto(resolve("/vs-mods/[slug]", { slug: modDBApiBasicMod.modid.toString() }))}
			>
				View
			</Button.Root>

			<Button.Root
				class="flex-1"
				variant="default"
				disabled={!App.info.isOnline || vsInstance === undefined || vsInstance.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid))}
				onclick={handleModInstall}
			>
				{vsInstance?.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid)) ? "Installed" : "Install"}
			</Button.Root>
		</Item.Actions>
	</Item.Root>
{/if}
