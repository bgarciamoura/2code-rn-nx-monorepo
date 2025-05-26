import { Text } from 'react-native';
import { styles } from './Typography.styles';
import type { TypographyProps } from './types/TypographyProps';

const Typography = ({
  variant = 'body1',
  color,
  align,
  weight,
  children,
  style,
  ...rest
}: TypographyProps) => {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        align && { textAlign: align },
        color && { color },
        weight && { fontWeight: weight },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export { Typography };
