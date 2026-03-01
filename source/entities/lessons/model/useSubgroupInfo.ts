import { createMMKV, useMMKVNumber } from "react-native-mmkv";
import { LessonNumSubgroup } from "@entities/lessons";

export const groupsStorage = createMMKV({ id: "groups-preferences" });

export const useSubgroupInfo = (groupName: string) => {
  const key = `selectedSubgroup_${groupName}`;
  const [selectedSubgroup, setSelectedSubgroup] = useMMKVNumber(
    key,
    groupsStorage
  );

  const current = (selectedSubgroup ?? 0) as LessonNumSubgroup;

  const update = (subgroup: LessonNumSubgroup) => {
    setSelectedSubgroup(subgroup);
  };

  return { current, update };
};
