import "@lc";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@react-navigation/native";
import { SWRConfig } from "swr";
import { DarkTheme, LightTheme, useColorScheme } from "@/shared/theme";
import { useEffect } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export default function RootLayout() {
  const [theme] = useColorScheme();

  useEffect(() => {
    if (theme) {
      Appearance.setColorScheme(theme as ColorSchemeName);
    }
  }, [theme]);

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        errorRetryCount: 1,
        errorRetryInterval: 2000,
      }}
    >
      <ThemeProvider value={theme === "dark" ? DarkTheme : LightTheme}>
        <SafeAreaProvider>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
