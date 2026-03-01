import { Button, ButtonProps, Host } from "@expo/ui/swift-ui";
import { labelStyle, tint } from "@expo/ui/swift-ui/modifiers";
import { PlatformColor } from "react-native";

interface Props {
  onPress: ButtonProps["onPress"];
}

export default function AddTaskButton({ onPress }: Props) {
  return (
    <Host matchContents>
      <Button
        label="create task"
        systemImage="checkmark"
        modifiers={[
          labelStyle("iconOnly"),
          tint(PlatformColor("systemMaterial")),
        ]}
        onPress={onPress}
      />
    </Host>
  );
}
