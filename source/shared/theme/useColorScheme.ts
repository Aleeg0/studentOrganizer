import {
  Appearance,
  ColorSchemeName,
  useColorScheme as useColorSchemeBase,
} from "react-native";
import { createMMKV, useMMKVString } from "react-native-mmkv";

const themeStorage = createMMKV({
  id: "themeStorage",
});

const COLOR_SCHEME_KEY = "color_scheme";

Appearance.setColorScheme(
  themeStorage.getString(COLOR_SCHEME_KEY) as ColorSchemeName
);

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

  return [
    (colorScheme ?? systemColorScheme) as ColorSchemeName,
    setTheme,
  ] as const;
};
