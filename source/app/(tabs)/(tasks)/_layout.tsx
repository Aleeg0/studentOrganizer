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
          headerTransparent: true,
          headerBlurEffect: "none",
          title: t("tabs.createTask"),
          presentation: "formSheet",
          sheetAllowedDetents: [0.6, 1],
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTransparent: true,
          headerBlurEffect: "none",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
};

export default TasksLayout;
