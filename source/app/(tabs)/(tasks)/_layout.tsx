import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { useColorScheme } from "@/shared/theme";
import { useAuth } from "@contexts";

const TasksLayout = () => {
  const { t } = useTranslation();
  const [theme] = useColorScheme();
  const { user } = useAuth();
  const blurEffect =
    theme === "dark" ? "systemMaterialDark" : "systemChromeMaterialLight";

  return (
    <Stack>
      <Stack.Protected guard={!user}>
        <Stack.Screen
          name="login"
          options={{
            title: "",
            headerTransparent: true,
            headerBlurEffect: isLiquidGlassAvailable() ? undefined : blurEffect,
          }}
        />
        <Stack.Screen
          name="registration"
          options={{
            title: "",
            headerTransparent: true,
            headerBlurEffect: isLiquidGlassAvailable() ? undefined : blurEffect,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen
          name="index"
          options={{
            headerTransparent: true,
            headerBlurEffect: isLiquidGlassAvailable() ? undefined : blurEffect,
            headerTitle: t("tabs.tasks"),
          }}
        />
        <Stack.Screen
          name="create"
          options={{
            headerTransparent: true,
            headerBlurEffect: isLiquidGlassAvailable() ? undefined : blurEffect,
            title: t("tabs.createTask"),
            presentation: "formSheet",
            sheetAllowedDetents: [0.6, 1],
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            headerTransparent: true,
            headerBlurEffect: isLiquidGlassAvailable() ? undefined : blurEffect,
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
};

export default TasksLayout;
