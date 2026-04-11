<script lang="ts">
	import * as Command from "$lib/components/ui/command";

	import { Store } from "./Store.svelte";
</script>

<Command.Dialog open={Store.instance.open} class="rounded-lg border shadow-md md:min-w-120">
	<Command.Input placeholder="Type a command or search..." />

	<Command.List>
		<Command.Empty>No results found.</Command.Empty>

		{#each Store.instance.groups as { heading, items }, i (heading)}
			<Command.Group {heading}>
				{#each items as { value, title, icon: Icon, keywords, onSelect } (value)}
					<Command.Item
						{value}
						{title}
						{keywords}
						onSelect={() => {
							onSelect();
							Store.instance.open = false;
						}}
					>
						{#if Icon}
							<Icon />
						{/if}

						<span>{title}</span>
					</Command.Item>
				{/each}
			</Command.Group>

			{#if i + 1 < Store.instance.groups.length}
				<Command.Separator />
			{/if}
		{/each}
	</Command.List>
</Command.Dialog>
