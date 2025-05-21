import type { Locale } from "$lib/paraglide/runtime";

type LocalesDataType = { locale: Locale; name: string; credits: string[] };

export const localesMeta: LocalesDataType[] = [
  {
    locale: "en",
    name: "English",
    credits: ["XurxoMF"],
  },
  {
    locale: "es",
    name: "Spanish",
    credits: ["XurxoMF"],
  },
];
