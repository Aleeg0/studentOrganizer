import { Alert, Share, StyleSheet } from "react-native";
import { Color, useLocalSearchParams } from "expo-router";
import { useSchedule, useSubgroupInfo } from "@entities/lessons";
import { CircularProgress } from "@expo/ui/jetpack-compose";
import { Host } from "@expo/ui/swift-ui";
import ScheduleList from "./ui/scheduleList/scheduleList";
import EmptySchedule from "./ui/emptySchedule";
import ScheduleScreenOptions from "./scheduleScreen.options";
import { useTranslation } from "react-i18next";

export default function ScheduleScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { t } = useTranslation();
  const { current, update } = useSubgroupInfo(name);
  const { schedule, refresh, isLoading } = useSchedule(name);

  const handleSharePress = async () => {
    const calendarId = schedule?.calendarId;

    if (!calendarId) {
      Alert.alert(t("common.errorTitle"), t("scheduleScreen.shareAlertError"));
      return;
    }

    const encodedCalendarId = encodeURIComponent(calendarId);
    const url = `${process.env.EXPO_PUBLIC_GOOGLE_CALENDAR_URL}${encodedCalendarId}`;

    try {
      const result = await Share.share({
        url: url,
      });

      if (result.action !== Share.sharedAction) {
        Alert.alert(
          t("common.errorTitle"),
          t("scheduleScreen.shareAlertError")
        );
      }
    } catch {
      Alert.alert(t("common.errorTitle"), t("scheduleScreen.shareAlertError"));
    }
  };

  const showEmptyState = !isLoading && !schedule?.schedules;

  return (
    <>
      <ScheduleScreenOptions
        subgroup={current}
        onChangeSubgroup={update}
        title={name}
        onShare={handleSharePress}
      />
      <Host style={styles.content}>
        {isLoading && <CircularProgress />}
        {showEmptyState ? (
          <EmptySchedule />
        ) : schedule ? (
          <ScheduleList
            handleRefresh={refresh}
            curSubgroup={current}
            schedule={schedule.schedules!}
          />
        ) : null}
      </Host>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Color.ios.systemGroupedBackground,
  },
});
