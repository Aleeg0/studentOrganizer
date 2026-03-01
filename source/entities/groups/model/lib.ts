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

export const groupBySpecializationDigits = (
  groups: StudentGroup[]
): GroupedStudentGroups => {
  return groups.reduce<GroupedStudentGroups>((acc, group) => {
    const firstThree = group.name.slice(0, 3);
    if (!acc[firstThree]) {
      acc[firstThree] = [];
    }
    acc[firstThree].push(group);
    return acc;
  }, {});
};
