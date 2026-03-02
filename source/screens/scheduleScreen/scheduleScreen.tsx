import { Stack, useLocalSearchParams } from "expo-router";
import RightHeader from "./ui/rightHeader/rightHeader";
import { useSchedule, useSubgroupInfo } from "@entities/lessons";
import { CircularProgress } from "@expo/ui/jetpack-compose";
import ScheduleList from "@/screens/scheduleScreen/ui/scheduleList/scheduleList";
import { Host } from "@expo/ui/swift-ui";
import styles from "./scheduleScreen.styles";
import EmptySchedule from "./ui/emptySchedule";

export default function ScheduleScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { current, update } = useSubgroupInfo(name);
  const { schedule, refresh, isLoading } = useSchedule(name);

  const handleRefresh = async () => {
    await refresh();
  };

  const showEmptyState = !isLoading && !schedule?.schedules;

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
        {showEmptyState ? (
          <EmptySchedule />
        ) : schedule ? (
          <ScheduleList
            handleRefresh={handleRefresh}
            curSubgroup={current}
            schedule={schedule.schedules!}
          />
        ) : null}
      </Host>
    </>
  );
}
