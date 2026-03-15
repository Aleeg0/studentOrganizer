import {
  Appearance,
  ColorSchemeName,
  useColorScheme as useColorSchemeBase,
} from "react-native";
import { createMMKV, useMMKVString } from "react-native-mmkv";
import { useEffect } from "react";

const themeStorage = createMMKV({
  id: "themeStorage",
});

const COLOR_SCHEME_KEY = "color_scheme";

export const useColorScheme = () => {
  const systemColorScheme = useColorSchemeBase();
  const [colorScheme, setColorScheme] = useMMKVString(
    COLOR_SCHEME_KEY,
    themeStorage
  );

  const setTheme = (value: ColorSchemeName) => {
    Appearance.setColorScheme(value);
    setColorScheme(value);
  };

  useEffect(() => {
    if (colorScheme) {
      Appearance.setColorScheme(colorScheme as ColorSchemeName);
    }
  }, [colorScheme]);

  return [
    (colorScheme ?? systemColorScheme ?? "dark") as ColorSchemeName,
    setTheme,
  ] as const;
};
