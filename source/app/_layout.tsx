import "@lc";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@react-navigation/native";
import { SWRConfig } from "swr";
import { DarkTheme, LightTheme, useColorScheme } from "@/shared/theme";
import { AuthLayout } from "@contexts";

export default function RootLayout() {
  const [theme] = useColorScheme();

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
          <AuthLayout>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </AuthLayout>
        </SafeAreaProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
