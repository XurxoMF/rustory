import { getContext, setContext, tick } from "svelte";

export type ComboboxType = "single" | "multiple";

export type ValueMap = {
	single: string;
	multiple: string[];
};

export const COMBOBOX_CONTEXT = Symbol("combobox");

export class ComboboxState<T extends ComboboxType> {
	open = $state(false);
	triggerRef = $state<HTMLButtonElement | null>(null);
	type: T;

	#getValue: () => ValueMap[T];
	#setValue: (v: ValueMap[T]) => void;

	constructor(getValue: () => ValueMap[T], setValue: (v: ValueMap[T]) => void, type: T) {
		this.#getValue = getValue;
		this.#setValue = setValue;
		this.type = type;
	}

	get value(): ValueMap[T] {
		return this.#getValue();
	}

	toggle() {
		this.open = !this.open;
	}

	async close() {
		this.open = false;
		await tick();
		this.triggerRef?.focus();
	}

	isSelected(itemValue: string): boolean {
		const v = this.#getValue();
		return Array.isArray(v) ? v.includes(itemValue) : v === itemValue;
	}

	selectItem(itemValue: string) {
		if (this.type === "multiple") {
			const current = (this.#getValue() as string[]) ?? [];
			const next = current.includes(itemValue) ? current.filter((v) => v !== itemValue) : [...current, itemValue];
			(this.#setValue as (v: string[]) => void)(next);
		} else {
			(this.#setValue as (v: string) => void)(this.isSelected(itemValue) ? "" : itemValue);
			this.close();
		}
	}
}

export function createComboboxContext<T extends ComboboxType>(
	getValue: () => ValueMap[T],
	setValue: (v: ValueMap[T]) => void,
	type: T
): ComboboxState<T> {
	const ctx = new ComboboxState(getValue, setValue, type);
	setContext(COMBOBOX_CONTEXT, ctx);
	return ctx;
}

export function getComboboxContext<T extends ComboboxType>(): ComboboxState<T> {
	return getContext(COMBOBOX_CONTEXT);
}
