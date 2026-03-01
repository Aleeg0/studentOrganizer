import { font, padding } from "@expo/ui/swift-ui/modifiers";
import { Text, VStack } from "@expo/ui/swift-ui";
import LessonCard from "@entities/lessons/ui/lessonCard/lessonCard.ios";
import { type DayName, Lesson, LessonNumSubgroup } from "@entities/lessons";
import {
  getKeyForLesson,
  isActiveCard,
} from "@entities/lessons/ui/lessonSection/lib";

interface Props {
  curSubgroup: LessonNumSubgroup;
  dayName: DayName;
  lessons: Lesson[];
}

export default function LessonSection({
  curSubgroup,
  dayName,
  lessons,
}: Props) {
  return (
    <VStack
      spacing={8}
      alignment="leading"
      modifiers={[padding({ bottom: 20 })]}
    >
      <Text
        modifiers={[font({ size: 20, weight: "bold" }), padding({ bottom: 4 })]}
      >
        {dayName}
      </Text>

      {lessons.map((lesson) => (
        <LessonCard
          key={getKeyForLesson(dayName, lesson)}
          startTime={lesson.startLessonTime}
          endTime={lesson.endLessonTime}
          photoLink={lesson.employees?.[0]?.photoLink}
          type={lesson.lessonTypeAbbrev}
          isActive={isActiveCard(curSubgroup, lesson.numSubgroup)}
          {...lesson}
        />
      ))}
    </VStack>
  );
}
