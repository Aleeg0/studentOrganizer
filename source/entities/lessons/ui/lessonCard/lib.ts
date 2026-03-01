import { Lesson, LessonType } from "@entities/lessons";

export const getColorByLessonType = (type: LessonType) => {
  switch (type) {
    case LessonType.PRACTICE:
      return "#30D054";
    case LessonType.LAB:
      return "#56D0F5";
    case LessonType.LECTURE:
      return "#FFD400";
  }
};

export const getWeeksInfo = (weekNumber: Lesson["weekNumber"]) => {
  if (weekNumber?.length === 4) {
    return "";
  }
  return weekNumber.join(",");
};
