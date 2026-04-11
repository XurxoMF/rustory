<script lang="ts">
	import { App } from "$lib/classes/App.svelte";

	import * as Command from "$lib/components/ui/command";
</script>

<Command.Dialog open={App.command.open} class="rounded-lg border shadow-md md:min-w-120">
	<Command.Input placeholder="Type a command or search..." />

	<Command.List>
		<Command.Empty>No results found.</Command.Empty>

		{#each App.command.groups as { heading, items }, i (heading)}
			<Command.Group {heading}>
				{#each items as { value, title, icon: Icon, keywords, onSelect } (value)}
					<Command.Item
						{value}
						{title}
						{keywords}
						onSelect={() => {
							onSelect();
							App.command.open = false;
						}}
					>
						{#if Icon}
							<Icon />
						{/if}

						<span>{title}</span>
					</Command.Item>
				{/each}
			</Command.Group>

			{#if i + 1 < App.command.groups.length}
				<Command.Separator />
			{/if}
		{/each}
	</Command.List>
</Command.Dialog>
