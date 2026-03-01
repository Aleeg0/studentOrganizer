import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const TasksLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerBlurEffect: "none",
          headerTitle: t("tabs.tasks"),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          presentation: "pageSheet",
          title: "Новая задача",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTransparent: true,
          headerBlurEffect: "none",
          headerTitle: t("tabs.tasks"),
        }}
      />
    </Stack>
  );
};

export default TasksLayout;
