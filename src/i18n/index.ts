import i18next from "i18next";
import { createI18nStore } from "svelte-i18next";

import enUS from "./en-US.json";
import esES from "./es-ES.json";

i18next.init({
  lng: "en-US",
  fallbackLng: "en-US",
  resources: {
    "en-US": { translation: enUS, name: "English", credits: "by XurxoMF" },
    "es-ES": { translation: esES, name: "Español (España)", credits: "by XurxoMF" },
  },
});

const i18n = createI18nStore(i18next);
export default i18n;
