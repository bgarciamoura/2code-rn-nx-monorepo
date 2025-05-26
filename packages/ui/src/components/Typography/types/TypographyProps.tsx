import type { TextProps, TextStyle } from 'react-native';
import type { TypographyVariant } from './TypographVariant';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

export type { TypographyProps };
