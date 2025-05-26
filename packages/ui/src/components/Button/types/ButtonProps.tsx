import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { Theme } from '../../../theme';

export interface ButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  theme?: Theme;
}
