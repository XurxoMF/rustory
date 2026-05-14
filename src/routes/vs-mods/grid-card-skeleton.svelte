<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import * as Badge from "$lib/components/ui/badge";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import * as Table from "$lib/components/ui/table";
	import * as Button from "$lib/components/ui/button";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title><Card.TitleSkeleton /></Card.Title>

		<Card.Description>
			<Card.DescriptionSkeleton />
			<Card.DescriptionSkeleton />
		</Card.Description>

		<Card.Action>
			<Badge.Skeleton />
		</Card.Action>
	</Card.Header>

	<Card.Content class="mt-auto">
		<AspectRatio.Skeleton ratio={3 / 2} class="overflow-hidden rounded-lg" />

		<Table.Root class="mt-4">
			<Table.Body>
				{#each Array(4) as _, j (j)}
					<Table.Row>
						<Table.Cell align="left">
							<Table.CellSkeleton />
						</Table.Cell>

						<Table.Cell align="right">
							<Table.CellSkeleton />
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>

	<Card.Footer class="flex justify-end gap-2">
		<Button.Skeleton class="flex-1" />
	</Card.Footer>
</Card.Root>
