import { Pressable, Text } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonColor?: string;
  textColor?: string;
}

const Button = ({
  title,
  onPress,
  buttonColor = "blue",
  textColor = "white",
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: buttonColor,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 16,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export { Button };
