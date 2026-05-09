<script lang="ts" module>
	export type SkeletonProps = PageProps;
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { App } from "$lib/classes/App.svelte";

	import * as Button from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import * as Input from "$lib/components/ui/input";
	import * as Slider from "$lib/components/ui/slider";
	import * as Switch from "$lib/components/ui/switch";
	import * as Textarea from "$lib/components/ui/textarea";

	let _: SkeletonProps = $props();
</script>

<Field.Group>
	<Field.Set>
		<Field.Legend>General</Field.Legend>
		<Field.Description>General settings.</Field.Description>

		<Field.Group>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<!-- Name-->
				<Field.Field>
					<Field.Label>Name</Field.Label>

					<Input.Skeleton />

					<Field.Description>This is the name of the instance. It must be at least 5 characters long and a maximum of 50.</Field.Description>
				</Field.Field>

				<!-- Vintage Story Version -->
				<Field.Field>
					<Field.Label>Vintage Story Version</Field.Label>

					<Button.Skeleton />

					<Field.Description>The game version you select will be installed here.</Field.Description>
				</Field.Field>
			</div>

			<!-- Description -->
			<Field.Field>
				<Field.Label>Description</Field.Label>

				<Textarea.Skeleton />

				<Field.Description>This is the description of the instance. It's optional and has a maximum of 250 characters.</Field.Description>
			</Field.Field>
		</Field.Group>
	</Field.Set>

	<Field.Separator />

	<Field.Set>
		<Field.Legend>Backups</Field.Legend>
		<Field.Description>Backup settings.</Field.Description>

		<Field.Group>
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
				<!-- Backups Auto -->
				<Field.Field>
					<Field.Label>Automatic backups</Field.Label>

					<Switch.Skeleton />

					<Field.Description>If this option is enabled, backups will be made before you play.</Field.Description>
				</Field.Field>

				<!-- Backups Limit -->
				<Field.Field>
					<Field.Label>Backups limit</Field.Label>

					<Slider.Skeleton />

					<Field.Description>You need at least 1 backup and can have a maximum of 10 backups.</Field.Description>
				</Field.Field>

				<!-- Backups Cmpression Level -->
				<Field.Field class="lg:col-span-2 2xl:col-auto">
					<Field.Label>Backups compression level</Field.Label>

					<Slider.Skeleton />

					<Field.Description>More compression means smaller backups but longer backup times.</Field.Description>
				</Field.Field>
			</div>
		</Field.Group>
	</Field.Set>

	<Field.Separator />

	<Field.Set>
		<Field.Legend>Advanced</Field.Legend>
		<Field.Description>Advanced settings.</Field.Description>

		<Field.Group>
			<!-- Start Params -->
			<Field.Field>
				<Field.Label>Start params</Field.Label>

				<Input.Skeleton />

				<Field.Description>
					You can change how the game behaves adding this params. You can check the documentation on the Vintage Story Wiki.
				</Field.Description>
			</Field.Field>

			<!-- ENV Vars -->
			<Field.Field>
				<Field.Label>Start params</Field.Label>

				<Input.Skeleton />

				<Field.Description>You can modify some things with ENV variables, not only for Vintage Story but for 3rd party tools.</Field.Description>
			</Field.Field>
		</Field.Group>
	</Field.Set>

	{#if App.info.osType === "linux"}
		<Field.Separator />

		<Field.Set>
			<Field.Legend>Linux</Field.Legend>
			<Field.Description>Linux specific settings.</Field.Description>

			<Field.Group>
				<!-- MesaGL Thread -->
				<Field.Field>
					<Field.Label>MesaGL Thread</Field.Label>

					<Switch.Skeleton />

					<Field.Description>MesaGL Thread may improve performance on some Linux systems. Disable it if it causes issues for you.</Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>
	{/if}

	<Button.Skeleton />
</Field.Group>
