import "i18next";
import ru from "./languages/ru.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof ru;
    };
  }
}
