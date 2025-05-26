import { spacing, borderRadius, shadows } from "../tokens";
import * as lightColors from "../tokens/generated/colors";
import type { Theme } from "../types/themeTypes";

const darkColors = {
  ...lightColors,
  background: { default: "#121212", paper: "#1E1E1E", contrast: "#333333" },
  text: {
    ...lightColors.default.colors.text,
    primary: "#EEE",
    secondary: "#CCC",
  },
};

export const darkTheme: Theme = {
  colors: darkColors as typeof lightColors,
  spacing,
  borderRadius,
  shadows,
  name: "dark",
};
