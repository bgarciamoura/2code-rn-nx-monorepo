import { createStyles } from '../../theme';

export const inputStyles = createStyles((theme) => ({
  container: {
    width: '100%',
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.contrast,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.info.main,
    paddingHorizontal: theme.spacing.md,
    height: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text.secondary,
    paddingVertical: 0,
  },
  errorMessage: {
    fontSize: 12,
    color: theme.colors.error.main,
    marginTop: theme.spacing.xs,
  },

  focused: {
    borderColor: theme.colors.primary.main,
    borderWidth: 2,
  },
  error: {
    borderColor: theme.colors.error.main,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: theme.colors.background.paper,
    borderColor: theme.colors.info.dark,
    opacity: 0.7,
  },
  disabledText: {
    color: theme.colors.text.disabled,
  },
  placeholderText: {
    color: theme.colors.text.primary,
  },
}));
