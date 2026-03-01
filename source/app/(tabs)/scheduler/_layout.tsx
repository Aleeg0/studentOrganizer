import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const SchedulerLayout = () => {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerBlurEffect: "none",
          headerTitle: t("groupsScreen.navTitle"),
        }}
      />
      <Stack.Screen
        name="[name]"
        options={{
          headerTransparent: true,
          headerBlurEffect: "none",
          headerTitleAlign: "left",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
};

export default SchedulerLayout;
