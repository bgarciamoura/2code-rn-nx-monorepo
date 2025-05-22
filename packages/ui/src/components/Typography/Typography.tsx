import { Text } from "react-native";
import type { TextStyle, TextProps } from "react-native";
import { styles } from "./Typography.styles";
import type { TypographyVariant } from "./types/TypographVariant";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: "auto" | "left" | "right" | "center" | "justify";
  weight?:
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color,
  align,
  weight,
  children,
  style,
  ...rest
}) => {
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

export default Typography;
export type { TypographyProps };
