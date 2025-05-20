import { StyleSheet } from 'react-native';
import type { Theme } from '../theme';

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.medium,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: theme.spacing.medium,
      marginVertical: theme.spacing.small,
    },
    title: {
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: theme.spacing.small,
    },
    button: {
      backgroundColor: theme.colors.button,
      paddingVertical: theme.spacing.small,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: theme.colors.buttonText,
      fontWeight: '600',
    },
  });

export { makeStyles };
