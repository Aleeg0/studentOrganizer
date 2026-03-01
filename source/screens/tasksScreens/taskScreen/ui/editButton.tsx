import { Button, ButtonProps, Host } from "@expo/ui/swift-ui";
import { labelStyle } from "@expo/ui/swift-ui/modifiers";

interface Props {
  systemImage: ButtonProps["systemImage"];
  onPress: ButtonProps["onPress"];
}

export default function EditButton({ onPress, systemImage }: Props) {
  return (
    <Host matchContents>
      <Button
        label="edit"
        systemImage={systemImage}
        modifiers={[labelStyle("iconOnly")]}
        onPress={onPress}
      />
    </Host>
  );
}
