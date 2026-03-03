import * as Notifications from "expo-notifications";
import { IosAuthorizationStatus, PermissionStatus } from "expo-notifications";
import { Platform } from "react-native";
import { useTranslation } from "react-i18next";

// Настройка поведения, когда уведомление приходит, а приложение открыто
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: false,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useTaskNotification = () => {
  const { t } = useTranslation();

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { ios } = await Notifications.requestPermissionsAsync();
      const status = ios?.status ?? IosAuthorizationStatus.DENIED;
      if (
        status !== IosAuthorizationStatus.DENIED &&
        status !== IosAuthorizationStatus.NOT_DETERMINED
      ) {
        finalStatus = PermissionStatus.GRANTED;
      }
    }

    if (finalStatus !== "granted") {
      alert("Необходимо разрешить уведомления в настройках!");
      return false;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return true;
  };

  const scheduleTaskReminder = async (
    title: string,
    deadline: Date,
    minutesBefore: number
  ) => {
    const hasPermission = await registerForPushNotificationsAsync();
    if (!hasPermission) return null;

    const triggerDate = new Date(
      deadline.getTime() - minutesBefore * 60 * 1000
    );

    if (triggerDate.getTime() <= Date.now()) {
      return null;
    }

    return await Notifications.scheduleNotificationAsync({
      content: {
        title: t("notifications.title"),
        body: t("notifications.description", { title }),
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggerDate,
      },
    });
  };

  const cancelTaskReminder = async (notificationId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  };

  return {
    scheduleTaskReminder,
    cancelTaskReminder,
  };
};
