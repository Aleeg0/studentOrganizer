import { LanguageDetectorModule } from "i18next";
import { createMMKV } from "react-native-mmkv";

const lcStorage = createMMKV({ id: "lcStorage" });
const LANGUAGE_KEY = "language";

export const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  init: () => {},

  detect: () => {
    return lcStorage.getString(LANGUAGE_KEY) ?? "en";
  },

  cacheUserLanguage: (language: string) => {
    lcStorage.set(LANGUAGE_KEY, language);
  },
};
