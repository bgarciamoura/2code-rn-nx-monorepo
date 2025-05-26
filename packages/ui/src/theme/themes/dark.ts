import { spacing, borderRadius, shadows } from "../tokens";
import * as importedLightColors from "../tokens/generated/colors";
import type { Theme } from "../types/themeTypes";

const lightColors = importedLightColors.default.colors;

const darkColors = {
  ...lightColors,
  background: { default: "#121212", paper: "#1E1E1E", contrast: "#333333" },
  text: {
    ...lightColors.text,
    primary: "#EEE",
    secondary: "#CCC",
  },
};

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  borderRadius,
  shadows,
  name: "dark",
};
