import { ScrollView, Spacer } from "@expo/ui/swift-ui";
import { padding, refreshable } from "@expo/ui/swift-ui/modifiers";
import {
  DayName,
  LessonNumSubgroup,
  LessonSection,
  Schedules,
  sortScheduleByDay,
} from "@entities/lessons";
import { useMemo } from "react";

interface Props {
  schedule: Schedules;
  curSubgroup: LessonNumSubgroup;
  handleRefresh: () => Promise<void>;
}

export default function ScheduleList({
  schedule,
  curSubgroup,
  handleRefresh,
}: Props) {
  const sortedSchedule = useMemo(() => sortScheduleByDay(schedule), [schedule]);

  return (
    <ScrollView
      modifiers={[padding({ horizontal: 15 }), refreshable(handleRefresh)]}
      showsIndicators={false}
    >
      <Spacer />
      {Object.entries(sortedSchedule).map(([title, lessons]) => (
        <LessonSection
          key={title}
          curSubgroup={curSubgroup}
          dayName={title as DayName}
          lessons={lessons}
        />
      ))}
    </ScrollView>
  );
}
