import { Button, ButtonProps, Host } from "@expo/ui/swift-ui";
import {
  disabled as disabledModifier,
  labelStyle,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { PlatformColor } from "react-native";

interface Props {
  onPress: ButtonProps["onPress"];
  disabled?: boolean;
}

export default function AddTaskButton({ onPress, disabled = false }: Props) {
  return (
    <Host matchContents>
      <Button
        label="create task"
        systemImage="checkmark"
        modifiers={[
          labelStyle("iconOnly"),
          tint(PlatformColor("systemMaterial")),
          disabledModifier(disabled),
        ]}
        onPress={onPress}
      />
    </Host>
  );
}
