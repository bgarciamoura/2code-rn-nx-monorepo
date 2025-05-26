import type { BorderRadius, Shadows, Spacing } from "../tokens";

import type * as importedColors from "../tokens/generated/colors";

export type Theme = {
  colors: typeof importedColors.default.colors;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  name?: string;
};
