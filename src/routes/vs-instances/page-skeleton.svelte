<script lang="ts">
	import * as Button from "$lib/components/ui/button";
	import * as Badge from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
	{#each Array(6) as _, i (i)}
		<Card.Root>
			<Card.Header>
				<Card.Title>
					<Card.TitleSkeleton />
				</Card.Title>

				<Card.Description>
					<Card.DescriptionSkeleton />
					<Card.DescriptionSkeleton />
				</Card.Description>

				<Card.Action>
					<Badge.Skeleton />
				</Card.Action>
			</Card.Header>

			<Card.Content class="mt-auto">
				<Table.Root>
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

				<Button.Skeleton class="flex-1" />

				<Button.Skeleton class="flex-1" />
			</Card.Footer>
		</Card.Root>
	{/each}
</div>
