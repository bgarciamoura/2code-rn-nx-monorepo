import { createStyles } from "./createStyles";

const GlobalStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.default.colors.background.default,
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.default.colors.background.paper,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 18,
    color: theme.colors.default.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  button: {
    backgroundColor: theme.colors.default.colors.background.default,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.default.colors.primary.dark,
    fontWeight: "600",
  },
}));

export { GlobalStyles };
