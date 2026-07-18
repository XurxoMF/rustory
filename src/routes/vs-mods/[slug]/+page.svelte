<script lang="ts">
	import { type PageProps } from "./$types";

	import Autoplay from "embla-carousel-autoplay";

	import { resolve } from "$app/paths";

	import IconWorld from "@tabler/icons-svelte/icons/world";
	import IconError404 from "@tabler/icons-svelte/icons/error-404";
	import IconTool from "@tabler/icons-svelte/icons/tool";

	import { Breadcrumbs } from "$lib/classes/stores/Breadcrumbs.svelte";
	import { Config } from "$lib/classes/stores/Config.svelte";

	import { AppError, AppErrorCodes } from "$lib/classes/errors/AppError.svelte";

	import { ModDBApiMod } from "$lib/classes/api/ModDBApiMod.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Empty from "$lib/components/ui/empty";
	import * as Button from "$lib/components/ui/button";
	import * as Carousel from "$lib/components/ui/carousel";
	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import * as Table from "$lib/components/ui/table";
	import * as Badge from "$lib/components/ui/badge";
	import * as Skeleton from "$lib/components/ui/skeleton";

	let { params }: PageProps = $props();

	let modDBApiModPromise: Promise<ModDBApiMod | undefined> = $derived(ModDBApiMod.fetch(params.slug));

	$effect(() => {
		modDBApiModPromise.then((modDBApiMod) => {
			if (modDBApiMod !== undefined) {
				Breadcrumbs.instance.segments = [{ label: "Vintage Story Mods", href: resolve("/vs-mods") }, { label: modDBApiMod.name }];
			} else {
				Breadcrumbs.instance.segments = [{ label: "Vintage Story Mods", href: resolve("/vs-mods") }, { label: "???" }];
			}
		});
	});
</script>

{#await modDBApiModPromise}
	<Skeleton.Root class="h-10 w-64" />
{:then modDBApiMod}
	<Typo.H1>
		{#if modDBApiMod === undefined}
			Not found
		{:else}
			{modDBApiMod.name}
		{/if}
	</Typo.H1>
{:catch}
	<Typo.H1>???</Typo.H1>
{/await}
<Typo.Leading>View, install and manage this Vintage Story Mod on your Vintage Story Instances.</Typo.Leading>

{#await modDBApiModPromise}
	<div class="grid w-full grid-cols-3 gap-8">
		<Skeleton.Root class="col-span-3 aspect-video rounded-lg xl:col-span-2" />
		<Skeleton.Root class="col-span-3 h-72 rounded-lg xl:col-span-1" />
	</div>
{:then modDBApiMod}
	{#if modDBApiMod === undefined}
		<Empty.Root>
			<Empty.Header>
				<Empty.Media variant="icon">
					<IconTool />
				</Empty.Media>

				<Empty.Title>No Vintage Story Mod found!</Empty.Title>

				<Empty.Description>
					The Vintage Story Mod you're looking for does not exists! If you think this is an error, please, report it on Discord or GitHub!
				</Empty.Description>
			</Empty.Header>

			<Empty.Content>
				<Button.Root variant="outline">
					<a href={resolve("/vs-mods")}> Return to mods page! </a>
				</Button.Root>
			</Empty.Content>
		</Empty.Root>
	{:else}
		<div class="grid w-full grid-cols-3 gap-8">
			<div class="col-span-3 px-12 xl:col-span-2">
				<Carousel.Root class="w-full" plugins={[Autoplay({ delay: 3000, playOnInit: true, stopOnInteraction: true })]}>
					<Carousel.Previous />

					<div class="overflow-hidden rounded-lg">
						<Carousel.Content>
							{#each modDBApiMod.screenshots as modDBApiMosScreenshot (modDBApiMosScreenshot.fileid)}
								<Carousel.Item>
									<AspectRatio.Root ratio={16 / 9}>
										<img
											class="h-full w-full rounded-lg bg-card object-cover"
											src={modDBApiMosScreenshot.mainfile}
											alt={`${modDBApiMod.name} screenshot ${modDBApiMosScreenshot.filename}`}
										/>
									</AspectRatio.Root>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
					</div>

					<Carousel.Next />
				</Carousel.Root>
			</div>

			<div class="col-span-3 xl:col-span-1">
				<Table.Root>
					<Table.Body>
						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Author</Table.Cell>
							<Table.Cell class="font-bold" align="right">{modDBApiMod.author}</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Side</Table.Cell>
							<Table.Cell class="font-bold" align="right">
								{modDBApiMod.side === "both" ? "Both" : modDBApiMod.side === "server" ? "Server" : "Client"}
							</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Tags</Table.Cell>
							<Table.Cell class="flex flex-wrap justify-end gap-1 font-bold" align="right">
								{#each modDBApiMod.tags as modDBApiModTag (modDBApiModTag)}
									<Badge.Root variant="secondary">{modDBApiModTag}</Badge.Root>
								{/each}
							</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Created</Table.Cell>
							<Table.Cell class="font-bold" align="right">{new Date(modDBApiMod.created).toLocaleString(Config.instance.locale)}</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Updated</Table.Cell>
							<Table.Cell class="font-bold" align="right"
								>{new Date(modDBApiMod.releases[0].created).toLocaleString(Config.instance.locale)}</Table.Cell
							>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Downloads</Table.Cell>
							<Table.Cell class="font-bold" align="right">{modDBApiMod.downloads}</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Follows</Table.Cell>
							<Table.Cell class="font-bold" align="right">{modDBApiMod.follows}</Table.Cell>
						</Table.Row>

						<Table.Row>
							<Table.Cell class="text-muted-foreground" align="left">Releases</Table.Cell>
							<Table.Cell class="font-bold" align="right">{modDBApiMod.releases.length}</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</div>
		</div>
	{/if}
{:catch err}
	{#if err instanceof AppError && err.code === AppErrorCodes.OFFLINE}
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
					<a href={resolve("/vs-mods")}> Return to mods page! </a>
				</Button.Root>
			</Empty.Content>
		</Empty.Root>
	{:else}
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
					<a href={resolve("/vs-mods")}> Return to mods page! </a>
				</Button.Root>
			</Empty.Content>
		</Empty.Root>
	{/if}
{/await}
