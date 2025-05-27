import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { Theme } from '../../../theme';

export interface CheckboxProps {
  checked: boolean;
  onValueChange: (newValue: boolean) => void;
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
  style?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  theme?: Theme;
  checkmarkIcon?: React.ReactElement;
}
