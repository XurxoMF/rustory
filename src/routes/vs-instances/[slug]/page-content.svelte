<script lang="ts">
	import { untrack } from "svelte";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconPencil from "@tabler/icons-svelte/icons/pencil";

	import { type VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Button from "$lib/components/ui/button";

	let { data }: { data: { instance: VSInstance } } = $props();

	const staticData = untrack(() => data);
</script>

<div class="absolute right-3 bottom-3 z-20 flex items-center gap-1 rounded-xl bg-card/90 p-1 shadow-xl backdrop-blur-xl">
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button.Root
					{...props}
					variant="outline"
					size="icon"
					onclick={() => goto(resolve("/vs-instances/[slug]/edit", { slug: staticData.instance.id }))}
				>
					<IconPencil />
					<span class="sr-only">Edit this Vintage Story Instance</span>
				</Button.Root>
			{/snippet}
		</Tooltip.Trigger>

		<Tooltip.Content>
			<p>Edit this Vintage Story Instance</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>

<Typo.H1>{staticData.instance.name}</Typo.H1>
<Typo.Leading>Manage this Vintage Story Instance.</Typo.Leading>

<div class="mt-6">
	<p>Checking {staticData.instance.name}</p>
</div>
