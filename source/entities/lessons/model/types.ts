export type Employee = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  photoLink: string;
};

export const LessonType = {
  PRACTICE: "ПЗ",
  LAB: "ЛР",
  LECTURE: "ЛК",
} as const;

export type LessonType = (typeof LessonType)[keyof typeof LessonType];

export type LessonNumSubgroup = 0 | 1 | 2;

export type Lesson = {
  auditories: number[];
  startLessonTime: string;
  endLessonTime: string;
  lessonTypeAbbrev: LessonType;
  subject: string;
  subjectFullName: string;
  numSubgroup: LessonNumSubgroup;
  weekNumber: number[];
  note?: string;
  employees: Employee[];
  startLessonDate: string;
  endLessonDate: string;
};

export const Day = {
  MONDAY: "Понедельник",
  TUESDAY: "Вторник",
  WEDNESDAY: "Среда",
  THURSDAY: "Четверг",
  FRIDAY: "Пятница",
  SATURDAY: "Суббота",
} as const;

export type DayName = (typeof Day)[keyof typeof Day];

export type Schedules = Record<DayName, Lesson[]>;

export type GroupSchedule = {
  startDate: string;
  endDate: string;
  schedules: Schedules | null;
};
