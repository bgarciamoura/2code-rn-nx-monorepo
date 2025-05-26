import { createStyles } from '../../theme/';

export const buttonStyles = createStyles((theme) => ({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    minWidth: 64,
  },

  primaryButton: {
    backgroundColor: theme.colors.primary.main,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary.main,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary.main,
    borderWidth: 1,
    paddingVertical: theme.spacing.md - 1,
    paddingHorizontal: theme.spacing.lg - 1,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },

  disabledButton: {
    opacity: 0.6,
    // backgroundColor: theme.colors.neutral.medium,
    // borderColor: theme.colors.neutral.dark,
  },

  baseText: {
    fontSize: 16,
    fontWeight: '600',
  },

  primaryText: {
    color: theme.colors.text.primary,
  },
  secondaryText: {
    color: theme.colors.text.secondary,
  },
  outlineText: {
    color: theme.colors.primary.main,
  },
  textText: {
    color: theme.colors.primary.main,
  },

  disabledText: {
    color: theme.colors.text.disabled,
  },

  smallButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    minWidth: 50,
  },
  mediumButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  largeButton: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xxl,
    minWidth: 100,
  },

  iconSpacing: {
    marginHorizontal: theme.spacing.sm / 2,
  },
}));
