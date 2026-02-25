import { LanguageDetectorModule } from "i18next";
import { lcStorage } from "@storages";
import { getLocales } from "expo-localization";

export const languageDetector: LanguageDetectorModule = {
  type: "languageDetector",
  init: () => {},

  detect: () => {
    try {
      return lcStorage.get() ?? getLocales()[0]?.languageCode ?? "en";
    } catch (error) {
      console.log("Error reading language", error);
    }
  },

  cacheUserLanguage: (language: string) => {
    try {
      lcStorage.set(language);
    } catch (error) {
      console.log("Error saving language", error);
    }
  },
};
