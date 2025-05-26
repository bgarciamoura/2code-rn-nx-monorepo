import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import type { ButtonProps } from './types/ButtonProps';
import { buttonStyles } from './Button.styles';
import { lightTheme } from '../../theme';
import { useMemo } from 'react';

const Button = ({
  onPress,
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  theme = lightTheme,
}: ButtonProps) => {
  const styles = useMemo(() => buttonStyles(theme), [theme]);
  const isDisabled = disabled || loading;
  const buttonContainerStyle = [
    styles.baseButton,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    isDisabled && styles.disabledButton,
    style,
  ];

  const buttonTextStyle = [
    styles.baseText,
    styles[`${variant}Text`],
    isDisabled && styles.disabledText,
    textStyle,
  ];

  const activityIndicatorColor =
    variant === 'primary' || variant === 'secondary'
      ? theme.colors.text.primary
      : theme.colors.primary.main;

  const content = loading ? (
    <ActivityIndicator color={activityIndicatorColor} />
  ) : (
    <>
      {leftIcon && <View style={styles.iconSpacing}>{leftIcon}</View>}
      <Text style={buttonTextStyle}>{children}</Text>
      {rightIcon && <View style={styles.iconSpacing}>{rightIcon}</View>}
    </>
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={buttonContainerStyle}
      activeOpacity={0.7}
    >
      {content}
    </TouchableOpacity>
  );
};

export { Button };
