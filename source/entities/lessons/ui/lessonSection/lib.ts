import {
  type DayName,
  type Lesson,
  LessonNumSubgroup,
} from "@entities/lessons";

export const isActiveCard = (
  curNumSubgroup: LessonNumSubgroup,
  lessonNumSubgroup: LessonNumSubgroup
) => {
  return lessonNumSubgroup === 0 || lessonNumSubgroup === curNumSubgroup;
};

export const getKeyForLesson = (dayName: DayName, lesson: Lesson) => {
  return (
    dayName +
    lesson.subject +
    lesson.startLessonTime +
    //lesson.numSubgroup +
    //lesson.lessonTypeAbbrev +
    lesson.weekNumber.join("")
  );
};
