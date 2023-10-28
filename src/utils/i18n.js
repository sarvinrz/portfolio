import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "../locales/en.json";
import faJSON from "../locales/fa.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJSON,
      numberFormat: {
        style: "decimal",
        useGrouping: true,
      },
    },
    fa: {
      translation: faJSON,
      numberFormat: {
        style: "decimal",
        useGrouping: true,
        numberingSystem: "persian", // Use Persian numerals
      },
    },
  },
  nonExplicitSupportedLngs: true,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  react: {
    useSuspense: true,
  },
  lng: "en",
  debug: true,
});

export default i18n;
