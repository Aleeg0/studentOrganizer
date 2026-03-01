import {
  DarkTheme as DefaultDarkTheme,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";

export const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    text: "#2c2c2c",
  },
};

export const DarkTheme: Theme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    background: "#222020",
    text: "#f4f4f4",
  },
};
