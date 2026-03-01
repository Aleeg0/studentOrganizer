export type StudentGroup = {
  id: string;
  name: string;
  facultyId: number;
  facultyAbbrev: string;
  specialityAbbrev: string;
  course: number;
};

export type GroupedStudentGroups = Record<string, StudentGroup[]>;
