import { Stack, useLocalSearchParams } from "expo-router";
import RightHeader from "./ui/rightHeader/rightHeader";
import { GroupSchedule, useSubgroupInfo } from "@entities/lessons";
import useSWR from "swr";
import { fetcher } from "@fetchApi";
import { CircularProgress } from "@expo/ui/jetpack-compose";
import ScheduleList from "@/screens/scheduleScreen/ui/scheduleList/scheduleList";
import { Host } from "@expo/ui/swift-ui";
import styles from "./scheduleScreen.styles";

type ScheduleRes = GroupSchedule;

export default function ScheduleScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { current, update } = useSubgroupInfo(name);
  const {
    data: groupSchedule,
    isLoading,
    mutate,
  } = useSWR<ScheduleRes>(
    name ? `https://iis.bsuir.by/api/v1/schedule?studentGroup=${name}` : null,
    fetcher
  );

  const handleRefresh = async () => {
    await mutate();
  };

  return (
    <>
      <Stack.Screen.Title>{name}</Stack.Screen.Title>
      <Stack.Screen
        options={{
          headerRight: () => (
            <RightHeader subgroup={current} onChangeSubgroup={update} />
          ),
        }}
      />
      <Host style={styles.content}>
        {isLoading && <CircularProgress />}
        {!isLoading && groupSchedule?.schedules && (
          <ScheduleList
            handleRefresh={handleRefresh}
            curSubgroup={current}
            schedule={groupSchedule.schedules}
          />
        )}
      </Host>
    </>
  );
}
