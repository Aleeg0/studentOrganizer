import useSWR from "swr";
import { fetcher } from "@fetchApi";
import { Employee, GroupSchedule, Lesson, Schedules } from "@entities/lessons";
import { useCallback } from "react";

type ScheduleRes = Omit<GroupSchedule, "calendarId"> & {
  studentGroupDto: {
    calendarId: string;
  };
};

const fetchSchedule = async (url: string) => {
  const data = await fetcher<ScheduleRes>(url);

  const filteredData: GroupSchedule = {
    startDate: data.startDate,
    endDate: data.endDate,
    schedules: null,
    calendarId: data.studentGroupDto.calendarId,
  };

  const lessons = data.schedules;

  if (lessons) {
    filteredData.schedules = Object.entries(lessons).reduce<Schedules>(
      (acc, [dayName, dayLessons]) => {
        acc[dayName as keyof Schedules] = dayLessons.map(
          (lesson) =>
            ({
              subject: lesson.subject,
              lessonTypeAbbrev: lesson.lessonTypeAbbrev,
              employees: lesson.employees.map(
                (emp) =>
                  ({
                    id: emp.id,
                    firstName: emp.firstName,
                    lastName: emp.lastName,
                    photoLink: emp.photoLink,
                    middleName: emp.middleName,
                  }) satisfies Employee
              ),
              weekNumber: lesson.weekNumber,
              numSubgroup: lesson.numSubgroup,
              startLessonTime: lesson.startLessonTime,
              endLessonTime: lesson.endLessonTime,
              auditories: lesson.auditories,
              note: lesson.note,
              endLessonDate: lesson.endLessonDate,
              startLessonDate: lesson.startLessonDate,
              subjectFullName: lesson.subjectFullName,
            }) satisfies Lesson
        );
        return acc;
      },
      {} as Schedules
    );
  }

  return filteredData;
};

export const useSchedule = (name?: string) => {
  const { data, isLoading, mutate } = useSWR(
    name ? `https://iis.bsuir.by/api/v1/schedule?studentGroup=${name}` : null,
    fetchSchedule
  );

  const refresh = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    schedule: data,
    isLoading,
    refresh,
  };
};
