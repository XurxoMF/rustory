<script lang="ts">
	import { resolve } from "$app/paths";

	import IconChevron from "@tabler/icons-svelte/icons/chevron-right";
	import IconDeviceGamepad from "@tabler/icons-svelte/icons/device-gamepad";
	import IconPlus from "@tabler/icons-svelte/icons/plus";
	import IconTool from "@tabler/icons-svelte/icons/tool";

	import { App } from "$lib/classes/App.svelte";

	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Collapsible from "$lib/components/ui/collapsible";
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Vintage Story</Sidebar.GroupLabel>

	<Sidebar.Menu>
		<Collapsible.Root>
			{#snippet child({ props })}
				<Sidebar.MenuItem {...props}>
					<Sidebar.MenuButton tooltipContent="Vintage Story Instances">
						{#snippet child({ props })}
							<a href={resolve("/vs-instances")} {...props}>
								<IconDeviceGamepad />
								<span>Instances</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>

					<Collapsible.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuAction {...props} class="data-[state=open]:rotate-90">
								<IconChevron />
								<span class="sr-only">Toggle</span>
							</Sidebar.MenuAction>
						{/snippet}
					</Collapsible.Trigger>

					<Collapsible.Content>
						<Sidebar.MenuSub>
							<Sidebar.MenuSubItem>
								<Sidebar.MenuSubButton href={resolve("/vs-instances/create")}>
									<IconPlus />
									<span>Create</span>
								</Sidebar.MenuSubButton>
							</Sidebar.MenuSubItem>

							{#each App.data.vsInstances as vsInstance (vsInstance.id)}
								<Sidebar.MenuSubItem>
									<Sidebar.MenuSubButton href={resolve("/vs-instances/[slug]", { slug: vsInstance.id })}>
										<IconTool />
										<span>{vsInstance.name}</span>
									</Sidebar.MenuSubButton>
								</Sidebar.MenuSubItem>
							{/each}
						</Sidebar.MenuSub>
					</Collapsible.Content>
				</Sidebar.MenuItem>
			{/snippet}
		</Collapsible.Root>
	</Sidebar.Menu>
</Sidebar.Group>
