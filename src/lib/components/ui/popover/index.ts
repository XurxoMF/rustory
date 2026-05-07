import Root, { type RootProps } from "./popover-root.svelte";
import Close, { type CloseProps } from "./popover-close.svelte";
import Content, { type ContentProps } from "./popover-content.svelte";
import Description, { type DescriptionProps } from "./popover-description.svelte";
import Header, { type HeaderProps } from "./popover-header.svelte";
import Title, { type TitleProps } from "./popover-title.svelte";
import Trigger, { type TriggerProps } from "./popover-trigger.svelte";
import Portal, { type PortalProps } from "./popover-portal.svelte";

export {
	Root,
	Content,
	Description,
	Header,
	Title,
	Trigger,
	Close,
	Portal,
	//
	type RootProps,
	type ContentProps,
	type DescriptionProps,
	type HeaderProps,
	type TitleProps,
	type TriggerProps,
	type CloseProps,
	type PortalProps
};
