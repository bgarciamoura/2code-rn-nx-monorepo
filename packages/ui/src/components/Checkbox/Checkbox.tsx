import { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { CheckboxProps } from './types/CheckboxProps';
import { checkboxStyles } from './Checkbox.styles';
import { lightTheme } from '../../theme';

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  label,
  disabled = false,
  errorMessage,
  style,
  boxStyle,
  labelStyle,
  errorTextStyle,
  theme = lightTheme,
  checkmarkIcon,
}) => {
  const styles = useMemo(() => checkboxStyles(theme), [theme]);
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!checked);
    }
  };
  const checkboxBoxCombinedStyles = [
    styles.checkboxBox,
    checked && styles.checkedBox,
    errorMessage && styles.errorBox,
    disabled && styles.disabledBox,
    boxStyle,
  ];
  const labelCombinedStyles = [
    styles.label,
    disabled && styles.disabledLabel,
    labelStyle,
  ];
  const errorTextCombinedStyles = [styles.errorMessage, errorTextStyle];

  return (
    <View
      style={[styles.container, style, disabled && styles.disabledContainer]}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
        style={styles.touchableArea}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: checked, disabled: disabled }}
      >
        <View style={checkboxBoxCombinedStyles}>
          {checked && checkmarkIcon}
        </View>
        {label && <Text style={labelCombinedStyles}>{label}</Text>}
      </TouchableOpacity>
      {errorMessage && (
        <Text style={errorTextCombinedStyles}>{errorMessage}</Text>
      )}
    </View>
  );
};
export { Checkbox };
