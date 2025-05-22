import { StyleSheet } from "react-native";
import type { Theme } from "./types/themeTypes";

function createStyles<T extends StyleSheet.NamedStyles<T>>(
  styles: (theme: Theme) => T,
) {
  return (theme: Theme) => StyleSheet.create(styles(theme));
}

export { createStyles };
