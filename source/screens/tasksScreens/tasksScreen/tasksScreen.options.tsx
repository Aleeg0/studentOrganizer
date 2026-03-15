import { Color, Stack } from "expo-router";
import { NativeStackHeaderItemButton } from "@react-navigation/native-stack";

interface Props {
  onCreatePress: NativeStackHeaderItemButton["onPress"];
}

function TasksScreenOptions({ onCreatePress }: Props) {
  return (
    <Stack.Screen
      options={{
        unstable_headerRightItems: () => [
          {
            type: "button",
            label: "create",
            icon: {
              name: "plus",
              type: "sfSymbol",
            },
            tintColor: Color.ios.systemBlue,
            onPress: onCreatePress,
          },
        ],
      }}
    />
  );
}

export default TasksScreenOptions;
