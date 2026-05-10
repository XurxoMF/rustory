<script lang="ts" module>
	export type VSAPIModOnListCardProps = {
		vsApiModOnList: VSAPIModOnList;
	};
</script>

<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import type { VSAPIModOnList } from "$lib/classes/api/VSAPIModOnList.svelte";

	import * as Button from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Badge from "$lib/components/ui/badge";
	import * as Table from "$lib/components/ui/table";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";

	let { vsApiModOnList }: VSAPIModOnListCardProps = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-lg">{vsApiModOnList.name}</Card.Title>

		<Card.Description class="line-clamp-2">{vsApiModOnList.summary}</Card.Description>

		<Card.Action>
			<Badge.Root variant="outline">{vsApiModOnList.side}</Badge.Root>
		</Card.Action>
	</Card.Header>

	<Card.Content class="mt-auto">
		<AspectRatio.Root ratio={3 / 2} class="overflow-hidden rounded-lg">
			<img src={vsApiModOnList.logo} alt={`${vsApiModOnList.name} logo`} />
		</AspectRatio.Root>

		<Table.Root class="mt-4">
			<Table.Body>
				<Table.Row>
					<Table.Cell class="text-muted-foreground" align="left">Author</Table.Cell>
					<Table.Cell class="font-bold" align="right">{vsApiModOnList.author}</Table.Cell>
				</Table.Row>

				<Table.Row>
					<Table.Cell class="text-muted-foreground" align="left">Follows</Table.Cell>
					<Table.Cell class="font-bold" align="right">{vsApiModOnList.follows}</Table.Cell>
				</Table.Row>

				<Table.Row>
					<Table.Cell class="text-muted-foreground" align="left">Downloads</Table.Cell>
					<Table.Cell class="font-bold" align="right">{vsApiModOnList.downloads}</Table.Cell>
				</Table.Row>

				<Table.Row>
					<Table.Cell class="text-muted-foreground" align="left">Total time played</Table.Cell>
					<Table.Cell class="font-bold" align="right">{vsApiModOnList.comments}</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</Card.Content>

	<Card.Footer class="flex justify-end gap-2">
		<Button.Root class="flex-1" variant="outline" onclick={() => App.toaster.toast.info("Not implemented yet!")}>View</Button.Root>

		<Button.Root class="flex-1" onclick={() => App.toaster.toast.info("Not implemented yet!")}>Install</Button.Root>
	</Card.Footer>
</Card.Root>
