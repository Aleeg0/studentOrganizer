import { GroupedStudentGroups, StudentGroup } from "./types";

export type GetBeautifulDescriptionParams = Pick<
  StudentGroup,
  "course" | "facultyAbbrev" | "specialityAbbrev"
> & {
  courseTitle: string;
};

const MIDDLE_DOT = "\u00B7";

export const getBeautifulDescription = ({
  courseTitle,
  course,
  facultyAbbrev,
  specialityAbbrev,
}: GetBeautifulDescriptionParams) => {
  return `${facultyAbbrev} ${MIDDLE_DOT} ${specialityAbbrev} ${MIDDLE_DOT} ${courseTitle} ${course}`;
};

export const groupBySpecializationDigits = (groups: StudentGroup[]) => {
  const result: GroupedStudentGroups = {};

  for (const group of groups) {
    const prefix =
      group.name.length >= 3 ? group.name.substring(0, 3) : "Other";

    if (!result[prefix]) {
      result[prefix] = [];
    }

    result[prefix].push(group);
  }

  return result;
};
