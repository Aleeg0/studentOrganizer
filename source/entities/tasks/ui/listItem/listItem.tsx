import { Button, HStack, Image, Spacer, Text } from "@expo/ui/swift-ui";
import { useRouter } from "expo-router";
import { tint } from "@expo/ui/swift-ui/modifiers";
import { Colors, useColorScheme } from "@/shared/theme";

interface Props {
  id: string;
  name: string;
}

export default function ListItem({ id, name }: Props) {
  const router = useRouter();
  const [theme] = useColorScheme();

  const handlePress = () => {
    router.push(`/(tabs)/(tasks)/${id}`);
  };

  return (
    <Button onPress={handlePress} modifiers={[tint(Colors[theme].textPrimary)]}>
      <HStack spacing={2}>
        <Text>{name}</Text>
        <Spacer />
        <Image systemName="chevron.right" size={14} color={"#939393"} />
      </HStack>
    </Button>
  );
}
