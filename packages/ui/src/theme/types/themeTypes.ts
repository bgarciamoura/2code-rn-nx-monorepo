import type { Colors, Spacing, BorderRadius, Shadows } from '../tokens';

export type Theme = {
  colors: Colors;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  name?: string;
};
