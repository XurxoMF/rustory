<script>
	import { App } from "$lib/classes/App.svelte";

	import * as AspectRatio from "$lib/components/ui/aspect-ratio";
	import * as Badge from "$lib/components/ui/badge";
	import * as Button from "$lib/components/ui/button";
	import * as Checkbox from "$lib/components/ui/checkbox";
	import * as Field from "$lib/components/ui/field";
	import * as Input from "$lib/components/ui/input";
	import * as Label from "$lib/components/ui/label";
	import * as List from "$lib/components/ui/list";
	import * as Pagination from "$lib/components/ui/pagination";
	import * as Select from "$lib/components/ui/select";
	import * as Slider from "$lib/components/ui/slider";
	import * as Switch from "$lib/components/ui/switch";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Textarea from "$lib/components/ui/textarea";
	import * as Toggle from "$lib/components/ui/toggle";
	import * as Typo from "$lib/components/ui/typography";

	App.breadcrumbs.segments = [];
</script>

<Typo.H1>Heading 1</Typo.H1>

<Typo.H2>Heading 2</Typo.H2>

<Typo.H3>Heading 3</Typo.H3>

<Typo.H4>Heading 4</Typo.H4>

<Typo.H5>Heading 5</Typo.H5>

<Typo.H6>Heading 6</Typo.H6>

<Typo.P>Paragraph</Typo.P>

<Typo.Blockquote>Blockquote</Typo.Blockquote>

<Typo.InlineCode>Inline code</Typo.InlineCode>

<Typo.Leading>Leading</Typo.Leading>

<Typo.Link>Link</Typo.Link>

<div class="flex w-full items-center justify-center gap-2">
	<Button.Root size="xs" class="flex-1">Button</Button.Root>

	<Button.Root size="icon-xs">B</Button.Root>

	<Button.Root size="sm" class="flex-1">Button</Button.Root>

	<Button.Root size="icon-sm">B</Button.Root>

	<Button.Root size="default" class="flex-1">Button</Button.Root>

	<Button.Root size="icon">B</Button.Root>

	<Button.Root size="lg" class="flex-1">Button</Button.Root>

	<Button.Root size="icon-lg">B</Button.Root>
</div>

<div class="flex items-center justify-center gap-4">
	<div class="flex-1">
		<AspectRatio.Root ratio={1 / 1} class="h-full bg-pink-500" />
	</div>

	<div class="flex-1">
		<AspectRatio.Root ratio={16 / 9} class="h-full bg-pink-500" />
	</div>
</div>

<div class="flex items-center gap-2">
	<Badge.Root class="flex-1">Badge</Badge.Root>

	<Badge.Root variant="destructive" class="flex-1">Badge</Badge.Root>

	<Badge.Root variant="ghost" class="flex-1">Badge</Badge.Root>

	<Badge.Root variant="link" class="flex-1">Badge</Badge.Root>

	<Badge.Root variant="outline" class="flex-1">Badge</Badge.Root>

	<Badge.Root variant="secondary" class="flex-1">Badge</Badge.Root>
</div>

<div class="flex items-center gap-2">
	<Checkbox.Root id="checkbox" />
	<Label.Root for="checkbox">Checkbox</Label.Root>
</div>

<div class="flex items-center gap-2">
	<Switch.Root id="switch" />
	<Label.Root for="switch">Switch</Label.Root>
</div>

<div class="flex items-center gap-2">
	<div class="flex flex-1 flex-col gap-2">
		<Label.Root for="input">Input</Label.Root>
		<Input.Root id="input" />
	</div>
</div>

<div class="flex items-center gap-2">
	<List.Ordered>
		<List.Item>Item 1</List.Item>
		<List.Item>Item 2</List.Item>
		<List.Item>Item 3</List.Item>
	</List.Ordered>

	<List.Unordered>
		<List.Item>Item 1</List.Item>
		<List.Item>Item 2</List.Item>
		<List.Item>Item 3</List.Item>
	</List.Unordered>
</div>

<div class="flex items-center gap-2">
	<div class="flex-1">
		<Field.Group>
			<Field.Set>
				<Field.Legend>Profile</Field.Legend>
				<Field.Description>This appears on invoices and emails.</Field.Description>

				<Field.Group>
					<Field.Field>
						<Field.Label for="name">Full name</Field.Label>
						<Input.Root id="name" />
						<Field.Description>This appears on invoices and emails.</Field.Description>
					</Field.Field>

					<Field.Field>
						<Field.Label for="username">Username</Field.Label>
						<Input.Root id="username" />
					</Field.Field>
				</Field.Group>
			</Field.Set>

			<Field.Separator />

			<Field.Set>
				<Field.Legend>Profile</Field.Legend>
				<Field.Description>This appears on invoices and emails.</Field.Description>

				<Field.Group>
					<Field.Field>
						<Field.Label for="name">Full name</Field.Label>
						<Input.Root id="name" />
						<Field.Description>This appears on invoices and emails.</Field.Description>
					</Field.Field>

					<Field.Field>
						<Field.Label for="username">Username</Field.Label>
						<Input.Root id="username" />
					</Field.Field>
				</Field.Group>
			</Field.Set>
		</Field.Group>
	</div>
</div>

<div class="flex items-center gap-2">
	<div class="flex-1">
		<Pagination.Root count={100} perPage={10}>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.Previous isActive page={{ type: "page", value: 1 }} />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === "ellipsis"}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.Next isActive page={{ type: "page", value: 1 }} />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</div>
</div>

<div class="flex items-center gap-2">
	<div class="flex-1">
		<Select.Root type="single">
			<Select.Trigger class="w-full" placeholder="Select a theme"></Select.Trigger>
			<Select.Content>
				<Select.Item value="light">Light</Select.Item>
				<Select.Item value="dark">Dark</Select.Item>
				<Select.Item value="system">System</Select.Item>
			</Select.Content>
		</Select.Root>
	</div>
</div>

<div class="flex h-40 items-center gap-2">
	<div class="flex-1">
		<Slider.Root orientation="horizontal" type="single" min={0} max={100} step={10} />
	</div>

	<div class="h-full flex-1">
		<Slider.Root orientation="vertical" type="single" min={0} max={100} step={10} />
	</div>
</div>

<div class="flex items-center gap-2">
	<div class="flex-1">
		<Tabs.Root class="w-full">
			<Tabs.List variant="default">
				<Tabs.Trigger value="account">Account</Tabs.Trigger>
				<Tabs.Trigger value="password">Password</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</div>
</div>

<div class="flex items-center gap-2">
	<Textarea.Root class="flex-1" />
</div>

<div class="flex items-center gap-2">
	<Toggle.Root class="flex-1" variant="default">Hello World</Toggle.Root>
	<Toggle.Root class="flex-1" variant="outline">Hello World</Toggle.Root>
</div>
