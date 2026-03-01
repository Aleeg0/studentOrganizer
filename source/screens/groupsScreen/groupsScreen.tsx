import { Host, List } from "@expo/ui/swift-ui";
import {
  groupBySpecializationDigits,
  GroupSection,
  StudentGroup,
} from "@entities/groups";
import { refreshable } from "@expo/ui/swift-ui/modifiers";
import useSWR from "swr";
import { fetcher } from "@fetchApi";
import { CircularProgress } from "@expo/ui/jetpack-compose";

export const data: StudentGroup[] = [
  {
    id: "210241",
    name: "210241",
    facultyId: 20017,
    facultyAbbrev: "ФКП",
    specialityAbbrev: "ПиППУЭС",
    course: 4,
  },
  {
    id: "222441",
    name: "222441",
    facultyId: 20005,
    facultyAbbrev: "ФИТУ",
    specialityAbbrev: "ИТиУвТС",
    course: 4,
  },
  {
    id: "250541",
    name: "250541",
    facultyId: 20026,
    facultyAbbrev: "ФКСиС",
    specialityAbbrev: "ВМСиС",
    course: 4,
  },
  {
    id: "263041",
    name: "263041",
    facultyId: 20040,
    facultyAbbrev: "ФИБ",
    specialityAbbrev: "ИКТ(СИ)",
    course: 4,
  },
];

const GroupsScreen = () => {
  const { data, isLoading, mutate } = useSWR<StudentGroup[]>(
    "https://iis.bsuir.by/api/v1/student-groups",
    fetcher
  );

  const handleRefresh = async () => {
    await mutate();
  };

  const groupedStudentGroups = groupBySpecializationDigits(data ?? []);

  return (
    <Host style={{ flex: 1 }}>
      {!isLoading ? (
        <List modifiers={[refreshable(handleRefresh)]}>
          {Object.entries(groupedStudentGroups).map(([prefix, groups]) => (
            <GroupSection key={prefix} title={prefix} items={groups} />
          ))}
        </List>
      ) : (
        <CircularProgress />
      )}
    </Host>
  );
};

export default GroupsScreen;
