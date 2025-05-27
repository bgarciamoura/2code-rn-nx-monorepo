import type {
  StyleProp,
  TextInputProps as RNTextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { Theme } from '../../../theme';

export interface InputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  theme?: Theme;
}
