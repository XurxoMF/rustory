<script lang="ts">
	import { resolve } from "$app/paths";

	import IconError404 from "@tabler/icons-svelte/icons/error-404";

	import * as Empty from "$lib/components/ui/empty";
	import * as Button from "$lib/components/ui/button";
</script>

<Empty.Root>
	<Empty.Header>
		<Empty.Media variant="icon">
			<IconError404 class="text-destructive" />
		</Empty.Media>

		<Empty.Title>An error has occurred!</Empty.Title>

		<Empty.Description>Check the logs for more information, ask for help on Discord and try again later!</Empty.Description>
	</Empty.Header>

	<Empty.Content>
		<Button.Root variant="outline">
			<a href={resolve("/")}> Return to home! </a>
		</Button.Root>
	</Empty.Content>
</Empty.Root>
