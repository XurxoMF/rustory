<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { resolve } from '$app/paths';

	import ChevronRightIcon from '@tabler/icons-svelte/icons/chevron-right';

	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Collapsible from '$lib/components/ui/collapsible';

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref collapsible="icon" {...restProps}>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Vintage Story</Sidebar.GroupLabel>

			<Sidebar.Menu>
				<Collapsible.Root open={true}>
					{#snippet child({ props })}
						<Sidebar.MenuItem {...props}>
							<Sidebar.MenuButton tooltipContent="Instances">
								{#snippet child({ props })}
									<a href={resolve('/')} {...props}>
										<ChevronRightIcon />
										<span>Instances</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>

							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuAction {...props} class="data-[state=open]:rotate-90">
										<ChevronRightIcon />
										<span class="sr-only">Toggle</span>
									</Sidebar.MenuAction>
								{/snippet}
							</Collapsible.Trigger>

							<Collapsible.Content>
								<Sidebar.MenuSub>
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton href={resolve('/')}>
											<span>Instance 1</span>
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
									<Sidebar.MenuSubItem>
										<Sidebar.MenuSubButton href={resolve('/')}>
											<span>Instance 2</span>
										</Sidebar.MenuSubButton>
									</Sidebar.MenuSubItem>
								</Sidebar.MenuSub>
							</Collapsible.Content>
						</Sidebar.MenuItem>
					{/snippet}
				</Collapsible.Root>
			</Sidebar.Menu>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
