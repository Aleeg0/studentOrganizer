import {
  HStack,
  Image,
  Rectangle,
  Spacer,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import {
  background,
  cornerRadius,
  font,
  foregroundStyle,
  frame,
  opacity,
  padding,
} from "@expo/ui/swift-ui/modifiers";
import { LessonCardProps } from "./lessonCard.ios";
import { PlatformColor } from "react-native";

interface Props extends Pick<
  LessonCardProps,
  "startTime" | "endTime" | "subject" | "numSubgroup"
> {
  rectangleColor: string;
  weekInfo: string;
}

export default function LessonCardInactive({
  startTime,
  endTime,
  subject,
  rectangleColor,
  numSubgroup,
  weekInfo,
}: Props) {
  return (
    <HStack
      modifiers={[
        padding({ horizontal: 8, vertical: 6 }),
        background(PlatformColor("secondarySystemGroupedBackground")),
        cornerRadius(12),
        opacity(0.5),
      ]}
      spacing={8}
    >
      <VStack alignment="trailing">
        <Text modifiers={[font({ size: 13 })]}>{startTime}</Text>
        <Text modifiers={[font({ size: 11 })]}>{endTime}</Text>
      </VStack>
      <Rectangle
        modifiers={[
          padding({ vertical: 8 }),
          frame({ width: 2 }),
          foregroundStyle({ type: "color", color: rectangleColor }),
          cornerRadius(10),
        ]}
      />
      <VStack alignment="leading">
        <HStack spacing={4}>
          <Text modifiers={[font({ size: 18, weight: "semibold" })]}>
            {subject}
          </Text>
          <HStack spacing={2}>
            <Image size={16} systemName="calendar" />
            {weekInfo.length !== 0 ? (
              <Text>{weekInfo}</Text>
            ) : (
              <Image size={13} systemName="infinity" />
            )}
          </HStack>
          {numSubgroup > 0 && (
            <HStack spacing={2}>
              <Image size={16} systemName="person" />
              <Text>{numSubgroup}</Text>
            </HStack>
          )}
        </HStack>
      </VStack>
      <Spacer />
    </HStack>
  );
}
