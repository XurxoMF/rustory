import Root, { type RootProps } from "./dialog-root.svelte";
import Portal, { type PortalProps } from "./dialog-portal.svelte";
import Title, { type TitleProps } from "./dialog-title.svelte";
import Footer, { type FooterProps } from "./dialog-footer.svelte";
import Header, { type HeaderProps } from "./dialog-header.svelte";
import Overlay, { type OverlayProps } from "./dialog-overlay.svelte";
import Content, { type ContentProps } from "./dialog-content.svelte";
import Description, { type DescriptionProps } from "./dialog-description.svelte";
import Trigger, { type TriggerProps } from "./dialog-trigger.svelte";
import Close, { type CloseProps } from "./dialog-close.svelte";

export {
	Root,
	Title,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	Close,
	//
	type RootProps,
	type PortalProps,
	type TitleProps,
	type FooterProps,
	type HeaderProps,
	type OverlayProps,
	type ContentProps,
	type DescriptionProps,
	type TriggerProps,
	type CloseProps
};
