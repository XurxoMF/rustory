<script lang="ts">
	import { resolve } from "$app/paths";

	import IconTool from "@tabler/icons-svelte/icons/tool";

	import * as Empty from "$lib/components/ui/empty";
	import * as Button from "$lib/components/ui/button";
</script>

<Empty.Root>
	<Empty.Header>
		<Empty.Media variant="icon">
			<IconTool />
		</Empty.Media>

		<Empty.Title>No Vintage Story Mods found!</Empty.Title>

		<Empty.Description>Something is wrong in here... how the hell there are no mods?</Empty.Description>
	</Empty.Header>

	<Empty.Content>
		<Button.Root variant="outline">
			<a href={resolve("/")}> Return to home! </a>
		</Button.Root>
	</Empty.Content>
</Empty.Root>
