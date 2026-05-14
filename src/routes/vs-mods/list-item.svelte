<script lang="ts" module>
	export type ListItemProps = {
		modDBApiBasicMod: ModDBApiBasicMod;
	};
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import type { ModDBApiBasicMod } from "$lib/classes/api/ModDBApiBasicMod.svelte";

	import * as Item from "$lib/components/ui/item";
	import * as Button from "$lib/components/ui/button";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";

	let { modDBApiBasicMod }: ListItemProps = $props();
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
	</Item.Actions>
</Item.Root>
