import { Button, Host } from "@expo/ui/swift-ui";
import { labelStyle, tint } from "@expo/ui/swift-ui/modifiers";
import { useRouter } from "expo-router";

export default function CloseButton() {
  const router = useRouter();

  const handlePress = () => {
    router.back();
  };

  return (
    <Host matchContents>
      <Button
        label="Go back"
        systemImage="xmark"
        modifiers={[labelStyle("iconOnly"), tint("red")]}
        onPress={handlePress}
      />
    </Host>
  );
}
