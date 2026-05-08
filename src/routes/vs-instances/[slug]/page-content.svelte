<script lang="ts">
	import { untrack } from "svelte";

	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import IconPencil from "@tabler/icons-svelte/icons/pencil";

	import { type VSInstance } from "$lib/classes/vs/VSInstance.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import * as Button from "$lib/components/ui/button";
	import * as FloatingMenu from "$lib/components/ui/floating-menu";

	let { data }: { data: { instance: VSInstance } } = $props();

	const staticData = untrack(() => data);
</script>

<Typo.P>Checking {staticData.instance.name}</Typo.P>

<FloatingMenu.Root>
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
</FloatingMenu.Root>
