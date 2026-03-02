import { HStack, Text, VStack } from "@expo/ui/swift-ui";
import { font, frame, tint } from "@expo/ui/swift-ui/modifiers";
import { Colors, useColorScheme } from "@/shared/theme";
import { Image, ImageProps } from "expo-image";

interface Props {
  title: string;
  description: string;
  imgPath: string;
  imgProps?: ImageProps;
}

export default function MessageBlockIos({
  title,
  description,
  imgPath,
  imgProps,
}: Props) {
  const [theme] = useColorScheme();

  return (
    <VStack alignment="center">
      <VStack spacing={8} alignment="center">
        <Text
          modifiers={[
            font({ size: 18, weight: "bold" }),
            tint(Colors[theme].textPrimary),
          ]}
        >
          {title}
        </Text>
        <Text
          modifiers={[font({ size: 16 }), tint(Colors[theme].textSecondary)]}
        >
          {description}
        </Text>
      </VStack>

      <HStack
        alignment="center"
        modifiers={[frame({ height: 200, width: 200 })]}
      >
        <Image
          contentFit="contain"
          {...imgProps}
          style={[{ width: "100%", height: "100%" }, imgProps?.style]}
          source={imgPath}
        />
      </HStack>
    </VStack>
  );
}
