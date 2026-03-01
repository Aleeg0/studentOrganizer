import { TFunction } from "i18next";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

export const getBeautifulDate = (
  date: Date,
  t: TFunction<"translation", undefined>,
  locale: string
) => {
  const dateStr = date.toDateString();

  if (dateStr === today.toDateString()) {
    return t("createTaskScreen.dateToday");
  }
  if (dateStr === tomorrow.toDateString()) {
    return t("createTaskScreen.dateTomorrow");
  }

  return date.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
