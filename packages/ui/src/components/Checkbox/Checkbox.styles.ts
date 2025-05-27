import { createStyles } from '../../theme';
export const checkboxStyles = createStyles((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  touchableArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.colors.info.main,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.text.primary,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.sm,
    flexShrink: 1,
  },
  errorMessage: {
    fontSize: 12,
    color: theme.colors.error.main,
    marginTop: theme.spacing.xs,
    marginLeft: 24 + theme.spacing.sm,
  },
  checkedBox: {
    backgroundColor: theme.colors.primary.main,
    borderColor: theme.colors.primary.main,
  },
  errorBox: {
    borderColor: theme.colors.error.main,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  disabledBox: {
    backgroundColor: theme.colors.background.paper,
    borderColor: theme.colors.text.disabled,
  },
  disabledLabel: {
    color: theme.colors.text.disabled,
  },
}));
