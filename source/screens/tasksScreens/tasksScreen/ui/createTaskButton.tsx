import { Button, Host } from "@expo/ui/swift-ui";
import { labelStyle } from "@expo/ui/swift-ui/modifiers";
import { Link } from "expo-router";

export default function CreateTaskButton() {
  return (
    <Link href={"/(tabs)/(tasks)/create"}>
      <Host matchContents>
        <Button
          label={"create task"}
          systemImage={"plus"}
          modifiers={[labelStyle("iconOnly")]}
        />
      </Host>
    </Link>
  );
}
