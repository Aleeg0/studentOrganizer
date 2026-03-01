import { Employee, Lesson } from "@entities/lessons";
import { getColorByLessonType, getWeeksInfo } from "./lib";
import LessonCardActive from "./lessonCard.active.ios";
import LessonCardInactive from "@entities/lessons/ui/lessonCard/lessonCard.inactive.ios";

export interface LessonCardProps {
  subject: Lesson["subject"];
  auditories: Lesson["auditories"];
  startTime: Lesson["startLessonTime"];
  endTime: Lesson["endLessonTime"];
  note?: Lesson["note"];
  photoLink?: Employee["photoLink"];
  type: Lesson["lessonTypeAbbrev"];
  isActive: boolean;
  weekNumber: Lesson["weekNumber"];
  numSubgroup: Lesson["numSubgroup"];
}

export default function LessonCard({
  type,
  isActive,
  weekNumber,
  ...props
}: LessonCardProps) {
  const rectangleColor = getColorByLessonType(type);
  const weekInfo = getWeeksInfo(weekNumber);

  if (isActive) {
    return (
      <LessonCardActive
        weekInfo={weekInfo}
        rectangleColor={rectangleColor}
        {...props}
      />
    );
  }

  return (
    <LessonCardInactive
      weekInfo={weekInfo}
      rectangleColor={rectangleColor}
      {...props}
    />
  );
}
