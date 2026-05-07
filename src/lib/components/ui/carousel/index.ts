import Root, { type RootProps } from "./carousel-root.svelte";
import Content, { type ContentProps } from "./carousel-content.svelte";
import Item, { type ItemProps } from "./carousel-item.svelte";
import Previous, { type PreviousProps } from "./carousel-previous.svelte";
import Next, { type NextProps } from "./carousel-next.svelte";
import {
	type CarouselAPI,
	type CarouselOptions,
	type CarouselPlugins,
	type CarouselProps,
	type EmblaCarouselConfig,
	type EmblaContext,
	getEmblaContext,
	setEmblaContext,
	EMBLA_CAROUSEL_CONTEXT
} from "./carousel-context";

export {
	Root,
	Content,
	Item,
	Previous,
	Next,
	//
	type RootProps,
	type ContentProps,
	type ItemProps,
	type PreviousProps,
	type NextProps,
	//
	type CarouselAPI,
	type CarouselOptions,
	type CarouselPlugins,
	type CarouselProps,
	type EmblaCarouselConfig,
	type EmblaContext,
	//
	getEmblaContext,
	setEmblaContext,
	//
	EMBLA_CAROUSEL_CONTEXT
};
