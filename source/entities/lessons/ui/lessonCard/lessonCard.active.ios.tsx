import { PlatformColor } from "react-native";
import { Image as ExpoImage } from "expo-image";
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
  padding,
} from "@expo/ui/swift-ui/modifiers";
import { LessonCardProps } from "./lessonCard.ios";

interface Props extends Omit<
  LessonCardProps,
  "type" | "isActive" | "weekNumber"
> {
  rectangleColor: string;
  weekInfo: string;
}

export default function LessonCardActive({
  startTime,
  endTime,
  rectangleColor,
  subject,
  auditories,
  note,
  photoLink,
  numSubgroup,
  weekInfo,
}: Props) {
  return (
    <HStack
      modifiers={[
        padding({ horizontal: 8, vertical: 10 }),
        background(PlatformColor("secondarySystemGroupedBackground")),
        cornerRadius(16),
      ]}
    >
      <VStack alignment="leading">
        <HStack spacing={8}>
          <VStack alignment="trailing">
            <Text modifiers={[font({ size: 16 })]}>{startTime}</Text>
            <Text modifiers={[font({ size: 13 })]}>{endTime}</Text>
          </VStack>
          <Rectangle
            modifiers={[
              frame({ width: 8 }),
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
            {auditories && (
              <Text modifiers={[font({ size: 16 })]}>{auditories}</Text>
            )}
            {note && <Text modifiers={[font({ size: 16 })]}>{note}</Text>}
          </VStack>
        </HStack>
      </VStack>
      <Spacer />
      <VStack>
        <HStack
          modifiers={[frame({ width: 52, height: 52 }), cornerRadius(100)]}
        >
          <ExpoImage
            source={{
              uri: photoLink,
            }}
            style={{ width: 52, height: 52 }}
            contentFit="fill"
            cachePolicy="memory-disk"
          />
        </HStack>
      </VStack>
    </HStack>
  );
}
