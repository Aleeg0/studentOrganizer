const light = {
  primary: "#FFF",
  secondary: "#F5F5F7",
  textPrimary: "#000",
  textSecondary: "#878787",
} as const;

const dark = {
  primary: "#000",
  secondary: "#292828",
  textPrimary: "#FFF",
  textSecondary: "#878787",
} as const;

export default {
  light,
  dark,
  unspecified: light,
} as const;
