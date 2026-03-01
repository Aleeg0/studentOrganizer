import useSWR from "swr";
import { StudentGroup } from "@entities/groups";
import { fetcher } from "@fetchApi";

const fetchGroups = async (url: string) => {
  const data = await fetcher<StudentGroup[]>(url);
  console.log("initData", data);
  const mappedData = data.map(
    (group) =>
      ({
        id: group.id,
        name: group.name,
        course: group.course,
        facultyAbbrev: group.facultyAbbrev,
        specialityAbbrev: group.specialityAbbrev,
        facultyId: group.facultyId,
      }) satisfies StudentGroup
  );
  console.log("filtered Data", mappedData);
  return mappedData;
};

export const useGroups = () => {
  const { data, isLoading, mutate } = useSWR(
    "https://iis.bsuir.by/api/v1/student-groups",
    fetchGroups
  );

  const refetch = async () => {
    await mutate();
  };

  return {
    groups: data,
    isLoading,
    refetch,
  };
};
