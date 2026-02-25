import * as i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { languageDetector } from "./languageDetector";
import ru from "./languages/ru.json";
import en from "./languages/en.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
} as const;

export default i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: "v4",
  });
