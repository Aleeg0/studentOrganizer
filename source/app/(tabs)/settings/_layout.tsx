import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const SettingsLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTransparent: true,
          headerBlurEffect: "none",
          headerTitle: t("tabs.settings"),
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
