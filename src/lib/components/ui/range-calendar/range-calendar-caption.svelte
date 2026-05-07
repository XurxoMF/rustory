<script lang="ts" module>
	export type CaptionProps = {
		captionLayout: RangeCalendar.RootProps["captionLayout"];
		months: RangeCalendar.MonthSelectProps["months"];
		monthFormat: RangeCalendar.MonthSelectProps["monthFormat"];
		years: RangeCalendar.YearSelectProps["years"];
		yearFormat: RangeCalendar.YearSelectProps["yearFormat"];
		month: DateValue;
		placeholder: DateValue | undefined;
		locale: string;
		monthIndex: number;
	};
</script>

<script lang="ts">
	import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";

	import * as RangeCalendar from ".";

	let { captionLayout, months, monthFormat, years, yearFormat, month, locale, placeholder = $bindable(), monthIndex = 0 }: CaptionProps = $props();

	function formatYear(date: DateValue) {
		const dateObj = date.toDate(getLocalTimeZone());
		if (typeof yearFormat === "function") return yearFormat(dateObj.getFullYear());
		return new DateFormatter(locale, { year: yearFormat }).format(dateObj);
	}

	function formatMonth(date: DateValue) {
		const dateObj = date.toDate(getLocalTimeZone());
		if (typeof monthFormat === "function") return monthFormat(dateObj.getMonth() + 1);
		return new DateFormatter(locale, { month: monthFormat }).format(dateObj);
	}
</script>

{#snippet MonthSelect()}
	<RangeCalendar.MonthSelect
		{months}
		{monthFormat}
		value={month.month}
		onchange={(e) => {
			if (!placeholder) return;
			const v = Number.parseInt(e.currentTarget.value);
			const newPlaceholder = placeholder.set({ month: v });
			placeholder = newPlaceholder.subtract({ months: monthIndex });
		}}
	/>
{/snippet}

{#snippet YearSelect()}
	<RangeCalendar.YearSelect {years} {yearFormat} value={month.year} />
{/snippet}

{#if captionLayout === "dropdown"}
	{@render MonthSelect()}
	{@render YearSelect()}
{:else if captionLayout === "dropdown-months"}
	{@render MonthSelect()}
	{#if placeholder}
		{formatYear(placeholder)}
	{/if}
{:else if captionLayout === "dropdown-years"}
	{#if placeholder}
		{formatMonth(placeholder)}
	{/if}
	{@render YearSelect()}
{:else}
	{formatMonth(month)} {formatYear(month)}
{/if}
