import { spacing, borderRadius, shadows } from "../tokens";
import * as importedColors from "../tokens/generated/colors";
import type { Theme } from "../types/themeTypes";

const colors = importedColors.default.colors;

export const lightTheme: Theme = {
  colors,
  spacing,
  borderRadius,
  shadows,
  name: "light",
};
