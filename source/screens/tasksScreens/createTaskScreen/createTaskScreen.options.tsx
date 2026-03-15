import { Color, Stack } from "expo-router";
import { NativeStackHeaderItemButton } from "@react-navigation/native-stack";

interface Props {
  onCancelPress: NativeStackHeaderItemButton["onPress"];
  onCreatePress: NativeStackHeaderItemButton["onPress"];
  createBtnDisable: NativeStackHeaderItemButton["disabled"];
}

export default function CreateTaskScreenOptions({
  onCancelPress,
  onCreatePress,
  createBtnDisable,
}: Props) {
  return (
    <Stack.Screen
      options={{
        unstable_headerLeftItems: (props) => [
          {
            type: "button",
            label: "cancel",
            icon: {
              name: "xmark",
              type: "sfSymbol",
            },
            tintColor: Color.ios.systemRed,
            onPress: onCancelPress,
          },
        ],
        unstable_headerRightItems: (props) => [
          {
            type: "button",
            variant: "done",
            label: "add",
            icon: {
              name: "checkmark",
              type: "sfSymbol",
            },
            onPress: onCreatePress,
            disabled: createBtnDisable,
          },
        ],
      }}
    />
  );
}
