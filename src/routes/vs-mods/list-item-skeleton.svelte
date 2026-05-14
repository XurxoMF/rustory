<script lang="ts">
	import * as Item from "$lib/components/ui/item";
	import * as Button from "$lib/components/ui/button";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
</script>

<Item.Root variant="outline">
	<Item.Media variant="image">
		<AspectRatio.Skeleton ratio={3 / 3} class="overflow-hidden rounded-lg" />
	</Item.Media>

	<Item.Content>
		<Item.Title><Item.TitleSkeleton /></Item.Title>

		<Item.Description><Item.DescriptionSkeleton /></Item.Description>
	</Item.Content>

	<Item.Actions>
		<Button.Skeleton class="flex-1" size="sm" />
	</Item.Actions>
</Item.Root>
