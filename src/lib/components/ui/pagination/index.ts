import Root, { type RootProps } from "./pagination-root.svelte";
import RootSkeleton, { type RootSkeletonProps } from "./pagination-root-skeleton.svelte";
import Content, { type ContentProps } from "./pagination-content.svelte";
import ContentSkeleton, { type ContentSkeletonProps } from "./pagination-content-skeleton.svelte";
import Item, { type ItemProps } from "./pagination-item.svelte";
import ItemSkeleton, { type ItemSkeletonProps } from "./pagination-item-skeleton.svelte";
import Link, { type LinkProps } from "./pagination-link.svelte";
import LinkSkeleton, { type LinkSkeletonProps } from "./pagination-link-skeleton.svelte";
import Ellipsis, { type EllipsisProps } from "./pagination-ellipsis.svelte";
import EllipsisSkeleton, { type EllipsisSkeletonProps } from "./pagination-ellipsis-skeleton.svelte";
import Previous, { type PreviousProps } from "./pagination-previous.svelte";
import PrevButton, { type PrevButtonProps } from "./pagination-prev-button.svelte";
import Next, { type NextProps } from "./pagination-next.svelte";
import NextButton, { type NextButtonProps } from "./pagination-next-button.svelte";

export {
	Root,
	RootSkeleton,
	Content,
	ContentSkeleton,
	Item,
	ItemSkeleton,
	Link,
	LinkSkeleton,
	Ellipsis,
	EllipsisSkeleton,
	Previous,
	PrevButton,
	Next,
	NextButton,
	//
	type RootProps,
	type RootSkeletonProps,
	type ContentProps,
	type ContentSkeletonProps,
	type ItemProps,
	type ItemSkeletonProps,
	type LinkProps,
	type LinkSkeletonProps,
	type EllipsisProps,
	type EllipsisSkeletonProps,
	type PreviousProps,
	type PrevButtonProps,
	type NextProps,
	type NextButtonProps
};
