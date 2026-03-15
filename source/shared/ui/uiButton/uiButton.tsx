import { JSX } from "react";
import { Pressable, PressableProps, Text, TextProps } from "react-native";

const IconPosition = {
  LEFT: "left",
  RIGHT: "right",
} as const;

type IconPosition = (typeof IconPosition)[keyof typeof IconPosition];

export interface UiButtonProps extends PressableProps {
  caption?: string;
  icon?: JSX.Element;
  iconPosition?: IconPosition;
  textStyle?: TextProps["style"];
  children?: JSX.Element;
}

export default function UiButton({
  caption,
  icon,
  iconPosition = IconPosition.LEFT,
  textStyle,
  children,
  ...props
}: UiButtonProps) {
  return (
    <Pressable {...props}>
      {iconPosition === IconPosition.LEFT && icon}
      {caption && <Text style={textStyle}>{caption}</Text>}
      {children}
      {iconPosition === IconPosition.RIGHT && icon}
    </Pressable>
  );
}
