import "@lc";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@react-navigation/native";
import { SWRConfig } from "swr";
import { DarkTheme, LightTheme, useColorScheme } from "@/shared/theme";

export default function RootLayout() {
  const [theme] = useColorScheme();

  return (
    <SWRConfig>
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
