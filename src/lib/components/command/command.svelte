<script lang="ts">
	import { Command as CommandStore } from "$lib/classes/stores/Command.svelte";

	import * as Command from "$lib/components/ui/command";
</script>

<Command.Dialog bind:open={CommandStore.instance.open} class="rounded-lg border shadow-md md:min-w-120">
	<Command.Input placeholder="Type a command or search..." />

	<Command.List>
		<Command.Empty>No results found.</Command.Empty>

		{#each CommandStore.instance.groups as { heading, items }, i (heading)}
			<Command.Group {heading}>
				{#each items as { value, title, icon: Icon, keywords, onSelect } (value)}
					<Command.Item
						{value}
						{title}
						{keywords}
						onSelect={() => {
							onSelect();
							CommandStore.instance.open = false;
						}}
					>
						{#if Icon}
							<Icon />
						{/if}

						<span>{title}</span>
					</Command.Item>
				{/each}
			</Command.Group>

			{#if i + 1 < CommandStore.instance.groups.length}
				<Command.Separator />
			{/if}
		{/each}
	</Command.List>
</Command.Dialog>
