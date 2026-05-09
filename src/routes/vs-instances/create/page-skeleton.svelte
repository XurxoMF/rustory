<script lang="ts" module>
	export type SkeletonProps = PageProps;
</script>

<script lang="ts">
	import { type PageProps } from "./$types";

	import { App } from "$lib/classes/App.svelte";

	import * as Typo from "$lib/components/ui/typography";
	import * as Button from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import * as Input from "$lib/components/ui/input";
	import * as Slider from "$lib/components/ui/slider";
	import * as Switch from "$lib/components/ui/switch";
	import * as Textarea from "$lib/components/ui/textarea";

	let _: SkeletonProps = $props();

	App.breadcrumbs.segments = null;
</script>

<Typo.H1><Typo.H1Skeleton /></Typo.H1>
<Typo.Leading><Typo.LeadingSkeleton /></Typo.Leading>

<Field.Group>
	<Field.Set>
		<Field.Legend><Field.LegendSkeleton /></Field.Legend>
		<Field.Description><Field.DescriptionSkeleton /></Field.Description>

		<Field.Group>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<!-- Name-->
				<Field.Field>
					<Field.Label><Field.LabelSkeleton /></Field.Label>

					<Input.Skeleton />

					<Field.Description><Field.DescriptionSkeleton /></Field.Description>
				</Field.Field>

				<!-- Vintage Story Version -->
				<Field.Field>
					<Field.Label><Field.LabelSkeleton /></Field.Label>

					<Button.Skeleton />

					<Field.Description><Field.DescriptionSkeleton /></Field.Description>
				</Field.Field>
			</div>

			<!-- Description -->
			<Field.Field>
				<Field.Label><Field.LabelSkeleton /></Field.Label>

				<Textarea.Skeleton />

				<Field.Description><Field.DescriptionSkeleton /></Field.Description>
			</Field.Field>

			<!-- Path-->
			<Field.Field>
				<Field.Label><Field.LabelSkeleton /></Field.Label>

				<div class="flex gap-2">
					<Button.Skeleton size="icon" />

					<Input.Skeleton />
				</div>

				<Field.Description><Field.DescriptionSkeleton /></Field.Description>
			</Field.Field>
		</Field.Group>
	</Field.Set>

	<Field.Separator />

	<Field.Set>
		<Field.Legend><Field.LegendSkeleton /></Field.Legend>
		<Field.Description><Field.DescriptionSkeleton /></Field.Description>

		<Field.Group>
			<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
				<!-- Backups Auto -->
				<Field.Field>
					<Field.Label><Field.LabelSkeleton /></Field.Label>

					<Switch.Skeleton />

					<Field.Description><Field.DescriptionSkeleton /></Field.Description>
				</Field.Field>

				<!-- Backups Limit -->
				<Field.Field>
					<Field.Label><Field.LabelSkeleton /></Field.Label>

					<Slider.Skeleton />

					<Field.Description><Field.DescriptionSkeleton /></Field.Description>
				</Field.Field>

				<!-- Backups Cmpression Level -->
				<Field.Field class="lg:col-span-2 2xl:col-auto">
					<Field.Label><Field.LabelSkeleton /></Field.Label>

					<Slider.Skeleton />

					<Field.Description><Field.DescriptionSkeleton /></Field.Description>
				</Field.Field>
			</div>
		</Field.Group>
	</Field.Set>

	<Field.Separator />

	<Field.Set>
		<Field.Legend><Field.LegendSkeleton /></Field.Legend>
		<Field.Description><Field.DescriptionSkeleton /></Field.Description>

		<Field.Group>
			<!-- Start Params -->
			<Field.Field>
				<Field.Label><Field.LabelSkeleton /></Field.Label>

				<Input.Skeleton />

				<Field.Description><Field.DescriptionSkeleton /></Field.Description>
			</Field.Field>

			<!-- ENV Vars -->
			<Field.Field>
				<Field.Label><Field.LabelSkeleton /></Field.Label>

				<Input.Skeleton />

				<Field.Description><Field.DescriptionSkeleton /></Field.Description>
			</Field.Field>
		</Field.Group>
	</Field.Set>

	{#if App.info.osType === "linux"}
		<Field.Separator />

		<Field.Set>
			<Field.Legend><Field.LegendSkeleton /></Field.Legend>
			<Field.Description><Field.DescriptionSkeleton /></Field.Description>

			<Field.Group>
				<!-- MesaGL Thread -->
				<Field.Field>
					<Field.Label><Field.LabelSkeleton /></Field.Label>

					<Switch.Skeleton />

					<Field.Description><Field.DescriptionSkeleton /></Field.Description>
				</Field.Field>
			</Field.Group>
		</Field.Set>
	{/if}

	<Button.Skeleton />
</Field.Group>
