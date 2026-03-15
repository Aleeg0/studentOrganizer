export type StudentGroup = {
  id: string;
  name: string;
  facultyId: number;
  facultyAbbrev: string;
  specialityAbbrev: string;
  course: number | null;
  calendarId: string;
};

export type GroupedStudentGroups = Record<string, StudentGroup[]>;
