<script>
	import { resolve } from "$app/paths";

	import { Breadcrumbs } from "$lib/classes/Breadcrumbs.svelte";

	import { H1, H2, H3, H4, H5, H6, P, Blockquote, InlineCode, Leading, Link } from "$lib/components/ui/typography";
	import * as List from "$lib/components/ui/list";
	import * as Accordion from "$lib/components/ui/accordion";

	Breadcrumbs.instance.segments = [];
</script>

<H1>Heading 1</H1>

<Leading>Leading to use as page description</Leading>

<H2>Heading 2</H2>

<P>
	Paragraph with some <InlineCode>inline code</InlineCode> and some <Link href={resolve("/")}>links</Link>... really cool!!
</P>

<H3>Heading 3</H3>

<H4>Heading 4</H4>

<H5>Heading 5</H5>

<H6>Heading 6</H6>

<Blockquote>"Blockquote to mention what someone said or something xD"</Blockquote>

<List.Unordered>
	<List.Item>Unordered List Item 1</List.Item>
	<List.Item>Unordered List Item 2</List.Item>
	<List.Item>Unordered List Item 3</List.Item>
</List.Unordered>

<List.Ordered>
	<List.Item>Ordered List Item 1</List.Item>
	<List.Item>Ordered List Item 2</List.Item>
	<List.Item>Ordered List Item 3</List.Item>
</List.Ordered>

<Accordion.Root type="single" class="w-full sm:max-w-[70%]" value="item-1">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>Product Information</Accordion.Trigger>
		<Accordion.Content class="flex flex-col gap-4 text-balance">
			<p>
				Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and
				reliability.
			</p>
			<p>Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2">
		<Accordion.Trigger>Shipping Details</Accordion.Trigger>
		<Accordion.Content class="flex flex-col gap-4 text-balance">
			<p>
				We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures
				delivery within 1-2 business days.
			</p>
			<p>All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.</p>
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3">
		<Accordion.Trigger>Return Policy</Accordion.Trigger>
		<Accordion.Content class="flex flex-col gap-4 text-balance">
			<p>
				We stand behind our products with a comprehensive 30-day return policy. If you&apos;re not completely satisfied, simply return the item in its
				original condition.
			</p>
			<p>Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.</p>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
