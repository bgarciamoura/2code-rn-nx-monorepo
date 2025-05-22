export const colors = {
  primary: {
    main: "#1976D2",
    light: "#42A5F5",
    dark: "#0D47A1",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#FF4081",
    light: "#FF80AB",
    dark: "#C51162",
    contrastText: "#FFFFFF",
  },
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#9E9E9E",
    hint: "#BDBDBD",
  },
  background: { default: "#FFFFFF", paper: "#F5F5F5", contrast: "#EEEEEE" },
  error: { main: "#D32F2F", light: "#EF5350", dark: "#C62828" },
  warning: { main: "#FFA000", light: "#FFB74D", dark: "#F57C00" },
  info: { main: "#1976D2", light: "#64B5F6", dark: "#0D47A1" },
  success: { main: "#43A047", light: "#81C784", dark: "#2E7D32" },
} as const;
export type Colors = typeof colors;
