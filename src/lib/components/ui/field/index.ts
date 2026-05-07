import Field, { type RootProps, rootVariants } from "./field-root.svelte";
import Set, { type FieldSetProps } from "./field-set.svelte";
import Legend, { type LegendProps } from "./field-legend.svelte";
import Group, { type GroupProps } from "./field-group.svelte";
import Content, { type ContentProps } from "./field-content.svelte";
import Label, { type LabelProps } from "./field-label.svelte";
import Title, { type TitleProps } from "./field-title.svelte";
import Description, { type DescriptionProps } from "./field-description.svelte";
import Separator, { type SeparatorProps } from "./field-separator.svelte";
import Error, { type ErrorProps } from "./field-error.svelte";

export {
	Field,
	Set,
	Legend,
	Group,
	Content,
	Label,
	Title,
	Description,
	Separator,
	Error,
	//
	type RootProps,
	type FieldSetProps,
	type LegendProps,
	type GroupProps,
	type ContentProps,
	type LabelProps,
	type TitleProps,
	type DescriptionProps,
	type SeparatorProps,
	type ErrorProps,
	//
	rootVariants
};
