import {
  Button,
  ButtonProps,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@expo/ui/swift-ui";
import { font, foregroundStyle } from "@expo/ui/swift-ui/modifiers";
import { Colors, useColorScheme } from "@/shared/theme";

interface Props {
  onPress: ButtonProps["onPress"];
  name: string;
  description: string;
}

export default function GroupSectionItem({
  onPress,
  name,
  description,
}: Props) {
  const [theme] = useColorScheme();

  return (
    <Button onPress={onPress}>
      <HStack>
        <VStack spacing={2} alignment={"leading"}>
          <Text
            modifiers={[
              font({ size: 18, design: "rounded" }),
              foregroundStyle(Colors[theme].textPrimary),
            ]}
          >
            {name}
          </Text>
          <Text
            modifiers={[
              font({ size: 14 }),
              foregroundStyle(Colors[theme].textSecondary),
            ]}
          >
            {description}
          </Text>
        </VStack>
        <Spacer />
        <Image systemName="chevron.right" size={14} color={"#939393"} />
      </HStack>
    </Button>
  );
}
