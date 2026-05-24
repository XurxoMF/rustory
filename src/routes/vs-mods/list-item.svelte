<script lang="ts" module>
	export type ListItemProps = {
		modDBApiBasicMod: ModDBApiBasicMod;
		vsInstance?: VSInstance | undefined;
	};
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import { App } from "$lib/classes/App.svelte";

	import type { VSInstance } from "$lib/classes/vs/VSInstance.svelte";
	import { VSMod } from "$lib/classes/vs/VSMod.svelte";

	import type { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import * as Item from "$lib/components/ui/item";
	import * as Button from "$lib/components/ui/button";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";

	let { modDBApiBasicMod, vsInstance }: ListItemProps = $props();
</script>

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
			onclick={async () => {
				if (!App.info.isOnline) {
					App.toaster.toast.error("You are offline!", { description: "You need to be online to install mods." });
					return;
				}

				if (vsInstance === undefined) {
					App.toaster.toast.error("No Instance selected!", { description: "You need to select a Vintage Story Instance to install mods." });
					return;
				}

				try {
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

					await release.download(vsInstance.modsDir, modDBApiMod.name);

					const zip = await release.download(vsInstance.modsDir, modDBApiMod.name);

					const vsMod = await VSMod.fromZip(zip);

					vsInstance.mods = [...vsInstance.mods, vsMod];

					App.toaster.toast.success("Mod installed successfully!", {
						description: `The mod ${modDBApiMod.name} has been installed successfully!`
					});
				} catch (err) {
					App.logger.error(`Something went wrong while installing the ModDB API Mod and couldn't be installed: ${err}`);
					App.toaster.toast.error("Something went wrong!", {
						description: "Something went wrong while installing the ModDB API Mod and couldn't be installed."
					});
				}
			}}
		>
			{vsInstance?.mods.some((mod) => modDBApiBasicMod.modidstrs.includes(mod.modid)) ? "Installed" : "Install"}
		</Button.Root>
	</Item.Actions>
</Item.Root>
