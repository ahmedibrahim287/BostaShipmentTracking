// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// English translations
import translationEN from "./en.json";
// Arabic translations
import translationAR from "./ar.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
