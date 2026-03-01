import { Day, DayName, Schedules } from "./types";

const DAY_ORDER: DayName[] = [
  Day.MONDAY,
  Day.TUESDAY,
  Day.WEDNESDAY,
  Day.THURSDAY,
  Day.FRIDAY,
  Day.SATURDAY,
];

export const sortScheduleByDay = (schedules: Schedules): Schedules =>
  DAY_ORDER.reduce<Schedules>((acc, day) => {
    if (schedules[day]) {
      acc[day] = schedules[day];
    }
    return acc;
  }, {} as Schedules);
