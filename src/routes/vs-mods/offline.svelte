<script lang="ts">
	import { resolve } from "$app/paths";

	import IconWorld from "@tabler/icons-svelte/icons/world";

	import * as Empty from "$lib/components/ui/empty";
	import * as Button from "$lib/components/ui/button";
</script>

<Empty.Root>
	<Empty.Header>
		<Empty.Media variant="icon">
			<IconWorld class="text-destructive" />
		</Empty.Media>

		<Empty.Title>You're offline!</Empty.Title>

		<Empty.Description>You can't search mods while you're offline! Check your internet connection and try again later!</Empty.Description>
	</Empty.Header>

	<Empty.Content>
		<Button.Root variant="outline">
			<a href={resolve("/")}> Return to home! </a>
		</Button.Root>
	</Empty.Content>
</Empty.Root>
