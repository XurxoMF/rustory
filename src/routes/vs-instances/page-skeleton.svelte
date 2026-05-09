<script lang="ts" module>
	export type SkeletonProps = PageProps;
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { App } from "$lib/classes/App.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Button from "$lib/components/ui/button";
	import * as Badge from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";

	let _: SkeletonProps = $props();

	App.breadcrumbs.segments = null;
</script>

<Typo.H1>Vintage Story Instances</Typo.H1>
<Typo.Leading>Play and manage your Vintage Story Instances.</Typo.Leading>

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
