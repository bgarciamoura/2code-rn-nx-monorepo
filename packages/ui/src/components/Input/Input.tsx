import { useState, useMemo } from 'react';
import { TextInput, Text, View } from 'react-native';
import type { InputProps } from './types/InputProps';
import { inputStyles } from './Input.styles';
import { lightTheme } from '../../theme';

const Input = ({
  label,
  errorMessage,
  disabled = false,
  containerStyle,
  inputStyle,
  labelStyle,
  errorTextStyle,
  theme = lightTheme,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = useMemo(() => inputStyles(theme), [theme]);
  const inputWrapperStyles = [
    styles.inputWrapper,
    isFocused && styles.focused,
    errorMessage && styles.error,
    disabled && styles.disabled,
  ];
  const textInputStyles = [
    styles.textInput,
    disabled && styles.disabledText,
    inputStyle,
  ];
  const labelTextStyles = [styles.label, labelStyle];
  const errorMessageTextStyles = [styles.errorMessage, errorTextStyle];
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={labelTextStyles}>{label}</Text>}
      <View style={inputWrapperStyles}>
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          placeholderTextColor={theme.colors.text.hint}
          style={textInputStyles}
          {...rest}
        />
      </View>
      {errorMessage && (
        <Text style={errorMessageTextStyles}>{errorMessage}</Text>
      )}
    </View>
  );
};
export { Input };
