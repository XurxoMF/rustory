import Root, { type RootProps } from "./tabs-root.svelte";
import Content, { type ContentProps } from "./tabs-content.svelte";
import List, { type ListVariants, type ListProps, listVariants } from "./tabs-list.svelte";
import ListSkeleton, { type ListSkeletonProps } from "./tabs-list-skeleton.svelte";
import Trigger, { type TriggerProps } from "./tabs-trigger.svelte";
import TriggerSkeleton, { type TriggerSkeletonProps } from "./tabs-trigger-skeleton.svelte";

export {
	Root,
	Content,
	List,
	ListSkeleton,
	Trigger,
	TriggerSkeleton,
	//
	type RootProps,
	type ContentProps,
	type ListVariants,
	type ListProps,
	type ListSkeletonProps,
	type TriggerProps,
	type TriggerSkeletonProps,
	//
	listVariants
};
